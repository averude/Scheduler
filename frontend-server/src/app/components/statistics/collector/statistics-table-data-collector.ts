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
import { EXISTING_ROW_GETTER, INSERT_INDEX_FN, MERGE_DECISION_FN } from "../../report-generator/utils/utils";

@Injectable()
export class StatisticsTableDataCollector {

  constructor(private sortingStrategy: UIPrioritySortingStrategy) {}

  getTableData(dtoMap: Map<number, EmployeeWorkStatDTO>,
               shifts: Shift[],
               positionMap: Map<number, Position>): TableData {
    const table = new TableData();

    shifts.forEach(shift => {
      const group = new RowGroup();
      group.id =     shift.id;
      group.value =  shift;
      group.rows =   [];
      group.findInsertIndexFn = INSERT_INDEX_FN;
      group.decideMergeFn = MERGE_DECISION_FN;
      group.getExistingRowFn = EXISTING_ROW_GETTER;

      table.addGroup(group);
    });

    dtoMap.forEach(dto => {
      const group = table.findRowGroup(dto.shiftId);
      if (group) {
        const rows = group.addOrMerge(dto.employee.id, {
          employee: dto.employee,
          mainPosition: positionMap.get(dto.mainPositionId)
        }, null).rows;

        dto.positionStats.forEach(pStat => {
          const positionRow = this.getPositionRow(positionMap, pStat);
          rows.push(positionRow);
        });
      }
    });

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
