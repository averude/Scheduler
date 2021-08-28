import { Position } from "../../../model/position";
import { roundToTwo } from "../../../shared/utils/utils";
import { SummationType } from "../../../model/summation-column";
import { Shift } from "../../../model/shift";
import { EmployeePositionStat, EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";
import { Injectable } from "@angular/core";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { UIPrioritySortingStrategy } from "../../calendar/utils/ui-priority-sorting-strategy";
import { StatisticsEmployeeRow, StatisticsPositionRow, StatisticsRowGroup } from "../model/data.model";

@Injectable()
export class StatisticsTableDataCollector {

  constructor(private sortingStrategy: UIPrioritySortingStrategy) {}

  getTableData(dtoMap: Map<number, EmployeeWorkStatDTO>,
               shifts: Shift[],
               positionMap: Map<number, Position>): TableData {
    const table = new TableData();
    table.sortingStrategy = this.sortingStrategy;

    shifts.forEach(shift => {
      const group = {
        id:     shift.id,
        value:  shift,
        rows:   []
      } as StatisticsRowGroup;

      table.addGroup(group);
    });


    dtoMap.forEach(dto => {
      const group = table.findRowGroup(dto.shiftId);
      if (group) {
        const employeeRow = {
          employee: dto.employee,
          rows: []
        } as StatisticsEmployeeRow;

        dto.positionStats.forEach(pStat => {
          employeeRow.rows.push(this.getPositionRow(positionMap, pStat));
        });
        group.rows.push(employeeRow);
      }
    });

    return table;
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
