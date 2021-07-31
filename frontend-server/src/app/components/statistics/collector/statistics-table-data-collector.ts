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
               positionMap: Map<number, Position>) {
    const groups: StatisticsRowGroup[] = shifts
      .sort(((a, b) => a.id - b.id))
      .map(shift => ({
        id: shift.id,
        name: shift.name,
        shift: shift,
        rows: []
      } as StatisticsRowGroup));

    for (let dto of dtos) {
      const group = binarySearch(groups, (mid => mid.id - dto.shiftId));
      if (group) {
        const employeeRow: StatisticsEmployeeRow = <StatisticsEmployeeRow> {
          employee: dto.employee,
          rows: []
        };

        dto.positionStats.forEach(pStat => {
          employeeRow.rows.push(this.getPositionRow(positionMap, pStat));
        });
        group.rows.push(employeeRow);
      }
    }

    return groups.sort((a, b) => b.shift.uiPriority - a.shift.uiPriority || a.id - b.id);

  }

  private getPositionRow(positionMap: Map<number, Position>,
                         positionStat: EmployeePositionStat) {
    return {
      position: positionMap.get(positionStat.positionId),
      cells: positionStat.summations.map(summation => ({
        columnId: summation.summationColumnId,
        value: summation.type === SummationType.HOURS_SUM ? roundToTwo(summation.value / 60) : summation.value
      }))
    } as unknown as StatisticsPositionRow;
  }
}

export class StatisticsRowGroup extends RowGroup {
  id: number;
  name: string;
  shift: Shift;
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
