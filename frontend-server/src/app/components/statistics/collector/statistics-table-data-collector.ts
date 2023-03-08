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
import { ReportTableSortingStrategy } from "../../../shared/table-sorting-strategies/report-table-sorting-strategy";
import { Employee } from "../../../model/employee";

// TODO: refactor
@Injectable()
export class StatisticsTableDataCollector {

  constructor(private sortingStrategy: UIPrioritySortingStrategy,
              private tableSortingStrategy: ReportTableSortingStrategy) {}

  getTableData(dtoMap: Map<number, EmployeeWorkStatDTO>,
               shifts: Shift[],
               employeeMap: Map<number, Employee>,
               positionMap: Map<number, Position>): TableData {
    const table = new TableData(this.tableSortingStrategy);

    shifts.forEach(shift => {
      const group = new RowGroup();
      group.id =     shift.id;
      group.value =  shift;

      table.addGroup(group, (val => val.id - shift.id));
    });

    dtoMap.forEach(dto => {
      const group = table.findRowGroup(dto.shiftId);
      if (group) {
        const rows = group.addOrMerge(dto.employeeId, {
          employee: employeeMap.get(dto.employeeId),
          mainPosition: positionMap.get(dto.mainPositionId)
        }, null).rows;

        dto.positionStats.forEach(pStat => {
          const positionRow = this.getPositionRow(positionMap, pStat);
          rows.push(positionRow);
        });
      }
    });

    table.groupSortingStrategy = this.sortingStrategy;
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
