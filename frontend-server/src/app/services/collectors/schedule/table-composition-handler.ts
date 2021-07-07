import { Composition, MainComposition, SubstitutionComposition } from "../../../model/composition";
import { Position } from "../../../model/position";
import { ScheduleRow, ScheduleRowGroup } from "../../../model/ui/schedule-table/table-data";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { MainCompositionService } from "../../http/main-composition.service";
import { SubstitutionShiftCompositionService } from "../../http/substitution-shift-composition.service";
import { TableRowProcessor } from "./table-row-processor.service";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { Injectable } from "@angular/core";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { TableRowRemover } from "./table-row-remover";
import { InitialData } from "../../../model/datasource/initial-data";
import { CUDService } from "../../http/interface/cud-service";
import { map, tap } from "rxjs/operators";
import { forkJoin, Observable } from "rxjs";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { putSorted } from "../../utils";

@Injectable()
export class TableCompositionHandler {

  constructor(private rowRemover: TableRowRemover,
              private rowProcessor: TableRowProcessor,
              private intervalCreator: IntervalCreator,
              private mainShiftCompositionService: MainCompositionService,
              private substitutionShiftCompositionService: SubstitutionShiftCompositionService) {}

  createOrUpdate(compositions: Composition[],
                 rowGroup: ScheduleRowGroup,
                 row: ScheduleRow,
                 parentRow: ScheduleRow,
                 initData: InitialData,
                 isSubstitution: boolean): Observable<any[]> {
    if (!compositions || compositions.length == 0) {
      throw new Error("Wrong args");
    }

    let obs: Observable<any>[];
    if (isSubstitution) {
      obs = this.createOrUpdateComposition(this.substitutionShiftCompositionService, compositions, rowGroup,
        row, parentRow, initData, isSubstitution);
    } else {
      obs = this.createOrUpdateComposition(this.mainShiftCompositionService, compositions, rowGroup,
        row, parentRow, initData, isSubstitution);
    }

    return forkJoin(obs);
  }

  remove(groupData: ScheduleRowGroup,
         row: ScheduleRow,
         initData: InitialData,
         compositions: Composition[]): Observable<any[]> {
    let obs: Observable<any>[] = [];
    compositions.forEach(composition => {
      if (composition.id) {
        let observable: Observable<any>;
        if (row.isSubstitution) {
          observable = this.substitutionShiftCompositionService.delete(composition.id);
        } else {
          observable = this.mainShiftCompositionService.delete(composition.id);
        }
        obs.push(observable.pipe(
          tap(res => this.rowRemover.removeRow(groupData, row, composition, initData.scheduleDTOs))
        ));
      }
    });
    return forkJoin(obs);
  }

  private createOrUpdateComposition<T extends Composition>(compositionService: CUDService<T>,
                                                           compositions: T[],
                                                           rowGroup: ScheduleRowGroup,
                                                           row: ScheduleRow,
                                                           parentRow: ScheduleRow,
                                                           initData: InitialData,
                                                           isSubstitution: boolean): Observable<Row>[] {
    let obs = [];
    compositions.forEach(composition => {
      if (composition.id) {
        obs.push(compositionService.update(composition)
          .pipe(
            map((res) => {
              const position = initData.positionMap.get(composition.positionId);
              return this.updateRow(initData, composition, position, rowGroup, row);
            })
          ));
      } else {
        obs.push(compositionService.create(composition)
          .pipe(
            map((res) => {
              composition = res;
              const position = initData.positionMap.get(composition.positionId);
              return this.createRow(initData, composition, position, rowGroup, isSubstitution, parentRow);
            })
          ));
      }
    });
    return obs;
  }

  private createRow(initData: InitialData,
                    composition: Composition,
                    position: Position,
                    group: ScheduleRowGroup,
                    isSubstitution: boolean,
                    parentRow: ScheduleRow) {
    if (initData.scheduleDTOs && initData.calendarDays) {

      const dto   = binarySearch(initData.scheduleDTOs, (mid => mid.parent.id - composition.employeeId));
      const norm  = initData.workingNormsMap.get(group.id)?.hours || 0;

      if (isSubstitution) {
        putSorted(<SubstitutionComposition> composition, dto.substitutionCompositions);
      } else {
        putSorted(<MainComposition> composition, dto.mainCompositions);
      }

      const row = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, initData.calendarDays,
        composition, position, norm, isSubstitution,
        (row) => row.position.id === composition.positionId);

      if (isSubstitution) {
        if (parentRow) {
          parentRow.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(parentRow.compositions, dto.substitutionCompositions);
        }
        row.intervals = row.compositions.map(value => convertCompositionToInterval(value));
      } else {
        row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionCompositions);
      }

      return row;
    }
  }

  private updateRow(initData: InitialData,
                    composition: Composition,
                    position: Position,
                    group: ScheduleRowGroup,
                    row: ScheduleRow) {
    if (!row) {
      throw new Error("No row provided");
    }

    if (initData.scheduleDTOs && initData.calendarDays) {
      const dto = binarySearch(initData.scheduleDTOs, (mid => mid.parent.id - composition.employeeId));

      if (row.position.id !== composition.positionId) {

        const group = row.group;
        const rowToMerge = <ScheduleRow> group.rows
          .find((value: ScheduleRow) => value.id === composition.employeeId
            && value.position.id === composition.positionId
            && value.isSubstitution === row.isSubstitution);

        if (rowToMerge) {
          this.transfer(row, rowToMerge, composition, dto);
        } else {
          const newRow = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, initData.calendarDays, composition,
            position, row.workingNorm, row.isSubstitution, () => false);
          newRow.compositions = [];
          newRow.intervals    = [];

          this.transfer(row, newRow, composition, dto);
        }
      } else {
        this.rowProcessor.updateRow(row, composition, dto);
      }

      if (row.isSubstitution) {
        const mainShiftComposition = (<SubstitutionComposition> composition).mainComposition;
        const rows = <ScheduleRow[]> group.table.findRowGroup(mainShiftComposition.shiftId).rows;

        for (let otherGroupMainRow of rows) {

          if (otherGroupMainRow.id === mainShiftComposition.employeeId && !otherGroupMainRow.isSubstitution) {
            otherGroupMainRow.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(otherGroupMainRow.compositions, dto.substitutionCompositions);
          }
        }
      }

      return row;
    }
  }

  private transfer(from: ScheduleRow,
                   to: ScheduleRow,
                   composition: Composition,
                   dto: EmployeeScheduleDTO){

    this.rowRemover.removeCompositionAndInterval(from, composition);

    to.compositions.push(composition);
    to.compositions.sort((a, b) => a.from.diff(b.from));

    this.intervalCreator.recalculate(from, dto);
    this.intervalCreator.recalculate(to, dto);
  }
}
