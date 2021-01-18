import { SummationDto } from "../../../model/dto/summation-dto";
import { Employee } from "../../../model/employee";
import { Position } from "../../../model/position";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { roundToTwo } from "../../../shared/utils/utils";
import { SummationType } from "../../../model/summation-column";
import { Shift } from "../../../model/shift";

export class StatisticsTableDataCollector {

  getTableData(dtos: SummationDto[],
               shifts: Shift[],
               positions: Position[]) {
    const groups: StatisticsRowGroup[] = shifts
      .sort(((a, b) => a.id - b.id))
      .map(shift => ({
        groupId: shift.id,
        name: shift.name,
        rows: []
      }));

    const employeeRows: StatisticsEmployeeRow[] = [];
    for (let dto of dtos) {
      const group = binarySearch(groups, (mid => mid.groupId - dto.shiftId));
      let last = group.rows.length - 1;

      if (last >= 0 && group.rows[last].employee.id === dto.parent.id) {
        group.rows[last].rows.push(this.getPositionRow(positions, dto));
      } else {
        group.rows.push({
          employee: dto.parent,
          rows: [this.getPositionRow(positions, dto)]
        });
      }
    }

    return groups;

  }

  private getPositionRow(positions: Position[], dto) {
    return {
      position: binarySearch(positions, (mid => mid.id - dto.positionId)),
      cells: dto.collection.map(summation => ({
        columnId: summation.summationColumnId,
        value: summation.type === SummationType.HOURS_SUM ? roundToTwo(summation.value / 60) : summation.value
      }))
    };
  }
}

export class StatisticsRowGroup {
  groupId: number;
  name: string;
  rows: StatisticsEmployeeRow[];
}

export class StatisticsEmployeeRow {
  // group:    StatisticsRowGroup;
  employee: Employee;
  rows:     StatisticsPositionRow[];
}

export class StatisticsPositionRow {
  // row:      StatisticsEmployeeRow;
  position: Position;
  cells:    StatisticsCell[];
}

export class StatisticsCell {
  // row:      StatisticsPositionRow;
  columnId: number;
  value:    any;
}
