import { Position } from "../../../model/position";
import { roundToTwo } from "../../../shared/utils/utils";
import { SummationType } from "../../../model/summation-column";
import { Shift } from "../../../model/shift";
import { EmployeePositionStat, EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";
import { Injectable } from "@angular/core";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { UIPrioritySortingStrategy } from "../../calendar/utils/ui-priority-sorting-strategy";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Employee } from "../../../model/employee";

@Injectable()
export class StatisticsTableDataCollector {

  constructor(private sortingStrategy: UIPrioritySortingStrategy) {}

  getTableData(dtoMap: Map<number, EmployeeWorkStatDTO>,
               shifts: Shift[],
               positionMap: Map<number, Position>): TableData {
    const table = new TableData();

    shifts.forEach(shift => {
      const group = {
        id:     shift.id,
        value:  shift,
        rows:   []
      } as RowGroup;

      table.addGroup(group);
    });

    dtoMap.forEach(dto => {
      const group = table.findRowGroup(dto.shiftId);
      if (group) {
        const employeeRow = {
          value: dto.employee,
          rows: []
        } as Row;

        dto.positionStats.forEach(pStat => {
          const positionRow = this.getPositionRow(positionMap, pStat);
          employeeRow.rows.push(positionRow);
        });
        group.rows.push(employeeRow);
      }
    });

    // Temporary
    table.groups
      .forEach(group => group.rows = group.rows
        .sort(((a, b) => {
          const valA = <Employee> a.value;
          const valB = <Employee> b.value;

          return valA.secondName.localeCompare(valB.secondName)
            || valA.firstName.localeCompare(valB.firstName);
        })));

    table.sortingStrategy = this.sortingStrategy;
    return table;
  }

  private getPositionRow(positionMap: Map<number, Position>,
                         positionStat: EmployeePositionStat) {
    return {
      value: positionMap.get(positionStat.positionId),
      cells: positionStat.summations.map(summation => ({
        columnId: summation.summationColumnId,
        value: summation.type === SummationType.HOURS_SUM ? roundToTwo(summation.value / 60) : summation.value
      }))
    } as unknown as Row;
  }
}
