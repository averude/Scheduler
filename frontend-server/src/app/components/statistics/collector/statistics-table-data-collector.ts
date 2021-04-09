import { Employee } from "../../../model/employee";
import { Position } from "../../../model/position";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { roundToTwo } from "../../../shared/utils/utils";
import { SummationType } from "../../../model/summation-column";
import { Shift } from "../../../model/shift";
import { EmployeePositionStat, EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";
import { Injectable } from "@angular/core";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";

@Injectable()
export class StatisticsTableDataCollector {

  getTableData(dtos: EmployeeWorkStatDTO[],
               shifts: Shift[],
               positions: Position[]) {
    const groups: StatisticsRowGroup[] = shifts
      .sort(((a, b) => a.id - b.id))
      .map(shift => ({
        id: shift.id,
        name: shift.name,
        rows: []
      }));

    for (let dto of dtos) {
      const group = binarySearch(groups, (mid => mid.id - dto.shiftId));
      if (group) {
        const employeeRow: StatisticsEmployeeRow = <StatisticsEmployeeRow> {
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
    } as unknown as StatisticsPositionRow;
  }
}

export class StatisticsRowGroup implements RowGroup {
  id: number;
  name: string;
  rows: StatisticsEmployeeRow[];
}

export class StatisticsEmployeeRow implements Row {
  // group:    StatisticsRowGroup;
  id:       number;
  employee: Employee;
  rows:     StatisticsPositionRow[];
  cells:    any;
}

export class StatisticsPositionRow implements Row {
  // row:      StatisticsEmployeeRow;
  id:       number;
  position: Position;
  cells:    StatisticsCell[];
}

export class StatisticsCell implements Cell {
  // row:      StatisticsPositionRow;
  value:    any;
  date: any;
  enabled: boolean;
}
