import { InitialData } from "../../../model/datasource/initial-data";
import { ScheduleCell, ScheduleRow, ScheduleRowValue } from "../../../model/ui/schedule-table/table-data";
import { CellCollector } from "../../../shared/collectors/cell-collector";
import { WorkDay } from "../../../model/workday";
import { Injectable } from "@angular/core";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { ReportTableSortingStrategy } from "../../../shared/table-sorting-strategies/report-table-sorting-strategy";

@Injectable()
export class ScheduleViewDataCollector {

  constructor(private cellCollector: CellCollector,
              private tableSortingStrategy: ReportTableSortingStrategy){
  }

  collect(initialData: InitialData): TableData {
    const result = new TableData(this.tableSortingStrategy);
    result.headerData = initialData.calendarDays;
    const group = new RowGroup();
    group.rows = initialData.scheduleDTOs
      .map(dto => {
        const row = {} as ScheduleRow;
        row.value = new ScheduleRowValue();
        row.value.employee = dto.parent;
        row.cells = this.cellCollector.collect<WorkDay, ScheduleCell>(initialData.calendarDays, dto.collection, true);
        return row;
      })
      .sort((a: ScheduleRow, b: ScheduleRow) => a.value.employee.secondName.localeCompare(b.value.employee.secondName));

    result.groups = [group];
    return result;
  }
}
