import { ScheduleCell, ScheduleRow, ScheduleRowValue } from "../../../../model/ui/schedule-table/table-data";
import { Position } from "../../../../model/position";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { Composition } from "../../../../model/composition";
import { convertCompositionToInterval } from "../../../../model/ui/schedule-table/row-interval";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { CellCollector } from "../../../../shared/collectors/cell-collector";
import { Injectable } from "@angular/core";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";
import { WorkDay } from "../../../../model/workday";
import { InitialData } from "../../../../model/datasource/initial-data";

@Injectable()
export class TableRowProcessor {

  constructor(private intervalCreator: IntervalCreator,
              private cellCollector: CellCollector) {}

  insertNewOrUpdateExistingRow(group: RowGroup,
                               dto: EmployeeScheduleDTO,
                               initData: InitialData,
                               composition: Composition,
                               position:    Position,
                               workingNorm: number,
                               isSubstitution: boolean): ScheduleRow {
    const value = new ScheduleRowValue();
    value.employee = initData.employeeMap.get(dto.employeeId);
    value.position = position;
    value.compositions = [composition];
    value.isSubstitution = isSubstitution;
    value.workingNorm = workingNorm;

    const result = <ScheduleRow> group.addOrMerge(value.employee.id, value, (row => {
      const rowValue: ScheduleRowValue = row.value;
      rowValue.compositions.push(composition);
      rowValue.compositions.sort((a, b) => a.from.diff(b.from));
    }));

    result.cells = this.cellCollector.collect<WorkDay, ScheduleCell>(initData.calendarDays, dto.workDays, false);
    result.cells.forEach((cell: ScheduleCell) => cell.parent = result);

    return result;
  }

  updateRow(row: ScheduleRow,
            composition: Composition,
            dto: EmployeeScheduleDTO) {
    const rowValue = row.value;

    exchangeComposition(rowValue.compositions, composition);

    if (rowValue.isSubstitution) {
      exchangeComposition(dto.substitutionCompositions, composition);
      rowValue.intervals = rowValue.compositions.map(value => convertCompositionToInterval(value));
    } else {
      exchangeComposition(dto.mainCompositions, composition);
      rowValue.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(rowValue.compositions, dto.substitutionCompositions);
    }
  }
}

export function exchangeComposition(compositions: Composition[],
                                    newComposition: Composition) {
  const oldCompositionIndex = compositions.findIndex(composition => composition.id === newComposition.id);
  if (oldCompositionIndex >= 0) {
    compositions.splice(oldCompositionIndex, 1, newComposition);
  } else {
    compositions.push(newComposition);
    compositions.sort((a,b) => a.from.diff(b.from));
  }
}
