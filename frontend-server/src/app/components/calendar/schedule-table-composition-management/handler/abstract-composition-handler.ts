import { TableRowRemover } from "../processor/table-row-remover";
import { TableRowProcessor } from "../processor/table-row-processor.service";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { Composition } from "../../../../model/composition";
import { ScheduleRow } from "../../../../model/ui/schedule-table/table-data";
import { InitialData } from "../../../../model/datasource/initial-data";
import { forkJoin, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { CUDService } from "../../../../services/http/interface/cud-service";
import { Row } from "../../../../lib/ngx-schedule-table/model/data/row";
import { Position } from "../../../../model/position";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { CompositionHandler } from "./composition-handler";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";

export abstract class AbstractCompositionHandler<T extends Composition> implements CompositionHandler<T> {

  protected constructor(protected rowRemover: TableRowRemover,
                        protected rowProcessor: TableRowProcessor,
                        protected intervalCreator: IntervalCreator,
                        protected compositionService: CUDService<T>) {}

  createOrUpdate(compositions: T[],
                 rowGroup: RowGroup,
                 row: ScheduleRow,
                 parentRow: ScheduleRow,
                 initData: InitialData): Observable<any[]> {
    if (!compositions || compositions.length == 0) {
      throw new Error("Wrong args");
    }

    return forkJoin(this.createOrUpdateComposition(compositions, rowGroup, row, parentRow, initData));
  }

  remove(groupData: RowGroup,
         row: ScheduleRow,
         initData: InitialData,
         compositions: T[]): Observable<any[]> {
    let obs: Observable<any>[] = [];
    compositions.forEach(composition => {
      if (composition.id) {
        obs.push(this.compositionService.delete(composition.id)
          .pipe(
            tap(res => this.rowRemover.removeRow(groupData, row, composition, initData.scheduleDTOMap))
          )
        );
      }
    });
    return forkJoin(obs);
  }

  private createOrUpdateComposition(compositions: T[],
                                    rowGroup: RowGroup,
                                    row: ScheduleRow,
                                    parentRow: ScheduleRow,
                                    initData: InitialData): Observable<Row>[] {
    let obs = [];
    compositions.forEach(composition => {
      const position = initData.positionMap.get(composition.positionId);
      if (composition.id) {
        obs.push(this.compositionService.update(composition)
          .pipe(
            map((res) => {
              return this.updateRow(initData, composition, position, rowGroup, row);
            })
          ));
      } else {
        obs.push(this.compositionService.create(composition)
          .pipe(
            map((res) => {
              composition = res;
              return this.createRow(initData, composition, position, rowGroup, parentRow);
            })
          ));
      }
    });
    return obs;
  }

  abstract createRow(initData: InitialData,
                     composition: T,
                     position: Position,
                     group: RowGroup,
                     parentRow: ScheduleRow);

  protected updateRow(initData: InitialData,
                      composition: T,
                      position: Position,
                      group: RowGroup,
                      row: ScheduleRow) {
    let updatedRow: ScheduleRow = row;
    if (!updatedRow) {
      throw new Error("No row provided");
    }

    if (initData.scheduleDTOMap && initData.calendarDays) {
      const dto = initData.scheduleDTOMap.get(composition.employeeId);

      if (updatedRow.value.position.id !== composition.positionId) {

        const group = updatedRow.parent;
        const rowToMerge = <ScheduleRow> group.rows
          .find((value: ScheduleRow) => value.id === composition.employeeId
            && value.value.position.id === composition.positionId
            && value.value.isSubstitution === updatedRow.value.isSubstitution);

        if (rowToMerge) {
          this.transfer(updatedRow, rowToMerge, composition, dto);
          updatedRow = rowToMerge;
        } else {
          const newRow = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, initData.calendarDays, composition,
            position, updatedRow.value.workingNorm, updatedRow.value.isSubstitution, () => false);
          newRow.value.compositions = [];
          newRow.value.intervals    = [];

          this.transfer(updatedRow, newRow, composition, dto);
          updatedRow = newRow;
        }
      } else {
        this.rowProcessor.updateRow(updatedRow, composition, dto);
      }

      this.afterRowUpdated(group, dto, composition);

      return updatedRow;
    }
  }

  protected afterRowUpdated(group: RowGroup,
                            dto: EmployeeScheduleDTO,
                            composition: T) {

  }

  private transfer(from: ScheduleRow,
                   to: ScheduleRow,
                   composition: Composition,
                   dto: EmployeeScheduleDTO){

    this.rowRemover.removeCompositionAndInterval(from, composition);

    to.value.compositions.push(composition);
    to.value.compositions.sort((a, b) => a.from.diff(b.from));

    this.intervalCreator.recalculate(from, dto);
    this.intervalCreator.recalculate(to, dto);
  }
}

