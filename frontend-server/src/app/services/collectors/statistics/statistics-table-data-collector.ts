import { Employee } from "../../../model/employee";
import { Position } from "../../../model/position";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { roundToTwo } from "../../../shared/utils/utils";
import { SummationType } from "../../../model/summation-column";
import { Shift } from "../../../model/shift";
import { EmployeePositionStat, EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";

export class StatisticsTableDataCollector {

  getTableData(dtos: EmployeeWorkStatDTO[],
               shifts: Shift[],
               positions: Position[]) {
    const groups: StatisticsRowGroup[] = shifts
      .sort(((a, b) => a.id - b.id))
      .map(shift => ({
        groupId: shift.id,
        name: shift.name,
        rows: []
      }));

    for (let dto of dtos) {
      const group = binarySearch(groups, (mid => mid.groupId - dto.shiftId));
      if (group) {
        const employeeRow: StatisticsEmployeeRow = {
          employee: dto.employee,
          rows: []
        };

        dto.positionStats.forEach(pStat => {
          employeeRow.rows.push(this.getPositionRow(positions, pStat));
        });
        group.rows.push(employeeRow);
      }
    }

    return groups;

  }

  private getPositionRow(positions: Position[],
                         positionStat: EmployeePositionStat) {
    return {
      position: binarySearch(positions, (mid => mid.id - positionStat.positionId)),
      cells: positionStat.summations.map(summation => ({
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
