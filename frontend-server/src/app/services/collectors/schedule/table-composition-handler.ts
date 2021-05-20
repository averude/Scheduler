import { Composition, MainComposition, SubstitutionComposition } from "../../../model/composition";
import { Position } from "../../../model/position";
import { ScheduleRow, ScheduleRowGroup } from "../../../model/ui/schedule-table/table-data";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { MainCompositionService } from "../../http/main-composition.service";
import { SubstitutionShiftCompositionService } from "../../http/substitution-shift-composition.service";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { TableRowProcessor } from "./table-row-processor.service";
import { NotificationsService } from "angular2-notifications";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { Injectable } from "@angular/core";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { TableRowRemover } from "./table-row-remover";
import { InitialData } from "../../../model/datasource/initial-data";
import { CUDService } from "../../http/interface/cud-service";

function putSorted<T extends Composition>(composition: T, compositions: T[]) {
  compositions.push(composition);
  compositions.sort((a, b) => (a.shiftId - b.shiftId) + (a.from.diff(b.from)));
}

@Injectable()
export class TableCompositionHandler {

  constructor(private tableRenderer: TableRenderer,
              private rowRemover: TableRowRemover,
              private rowProcessor: TableRowProcessor,
              private intervalCreator: IntervalCreator,
              private cellEnabledSetter: CellEnabledSetter,
              private sumCalculator: TableSumCalculator,
              private mainShiftCompositionService: MainCompositionService,
              private substitutionShiftCompositionService: SubstitutionShiftCompositionService,
              private notificationsService: NotificationsService) {}

  createOrUpdate(compositions: Composition[],
                            rowGroup: ScheduleRowGroup,
                            row: ScheduleRow,
                            parentRow: ScheduleRow,
                            initData: InitialData,
                            isSubstitution: boolean) {
    if (compositions) {
      if (isSubstitution) {
        this.createOrUpdateComposition(this.substitutionShiftCompositionService, compositions, rowGroup,
          row, parentRow, initData, isSubstitution);
      } else {
        this.createOrUpdateComposition(this.mainShiftCompositionService, compositions, rowGroup,
          row, parentRow, initData, isSubstitution);
      }
    }
  }

  remove(groupData: ScheduleRowGroup,
         row: ScheduleRow,
         initData: InitialData,
         compositions: Composition[]) {
    compositions.forEach(composition => {
      if (composition.id) {
        if (row.isSubstitution) {
          this.substitutionShiftCompositionService.delete(composition.id)
            .subscribe(res => this.rowRemover.removeRow(groupData, row, composition, initData.scheduleDTOs));
        } else {
          this.mainShiftCompositionService.delete(composition.id)
            .subscribe(res => this.rowRemover.removeRow(groupData, row, composition, initData.scheduleDTOs));
        }
      }
    });
  }

  private createOrUpdateComposition<T extends Composition>(compositionService: CUDService<T>,
                                                           compositions: T[],
                                                           rowGroup: ScheduleRowGroup,
                                                           row: ScheduleRow,
                                                           parentRow: ScheduleRow,
                                                           initData: InitialData,
                                                           isSubstitution: boolean) {
    compositions.forEach(composition => {
      if (composition.id) {
        compositionService.update(composition)
          .subscribe((res) => {
            const position = binarySearch(initData.positions, (mid => mid.id - composition.positionId));
            this.updateRow(initData, composition, position, rowGroup, row);
          });
      } else {
        compositionService.create(composition)
          .subscribe((res) => {
            composition = res;
            const position = binarySearch(initData.positions, (mid => mid.id - composition.positionId));
            this.createRow(initData, composition, position, rowGroup, isSubstitution, parentRow);
          });
      }
    });
  }

  private createRow(initData: InitialData,
                    composition: Composition,
                    position: Position,
                    group: ScheduleRowGroup,
                    isSubstitution: boolean,
                    parentRow?: ScheduleRow) {
    if (initData.scheduleDTOs && initData.calendarDays) {

      const dto   = binarySearch(initData.scheduleDTOs, (mid => mid.parent.id - composition.employeeId));
      const norm  = binarySearch(initData.workingNorms, (mid => mid.shiftId - group.id))?.hours || 0;

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
          this.cellEnabledSetter.processRow(parentRow, group.table.from, group.table.to);
        }
        row.intervals = row.compositions.map(value => convertCompositionToInterval(value));
      } else {
        row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionCompositions);
      }

      this.cellEnabledSetter.processRow(row, group.table.from, group.table.to);
      this.sumCalculator.calculateWorkHoursSum([group]);

      this.tableRenderer.renderRowGroup(group.id);
      this.tableRenderer.renderRow(row.id);
      this.notificationsService.success('Created');
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

          this.tableRenderer.renderRowGroup(group.id);
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
            this.cellEnabledSetter.processRow(otherGroupMainRow, group.table.from, group.table.to);
          }
        }
      }

      this.cellEnabledSetter.processRow(row, group.table.from, group.table.to);
      this.sumCalculator.calculateWorkHoursSum([group]);

      this.tableRenderer.renderRow(row.id);
      this.notificationsService.success('Updated');
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

    this.cellEnabledSetter.process(from);
    this.cellEnabledSetter.process(to);
  }
}
