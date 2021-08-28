import { InitialData } from "../../../model/datasource/initial-data";
import { ScheduleCell, ScheduleRow, ScheduleRowData } from "../../../model/ui/schedule-table/table-data";
import { CellCollector } from "../../../services/collectors/cell-collector";
import { WorkDay } from "../../../model/workday";
import { Injectable } from "@angular/core";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";

@Injectable()
export class ScheduleViewDataCollector {

  constructor(private cellCollector: CellCollector){
  }

  collect(initialData: InitialData): TableData {
    const result = new TableData();
    result.headerData = initialData.calendarDays;
    const group = new RowGroup();
    group.rows = initialData.scheduleDTOs
      .map(dto => {
        const row = {} as ScheduleRow;
        row.value = new ScheduleRowData();
        row.value.employee = dto.parent;
        row.cells = this.cellCollector.collect<WorkDay, ScheduleCell>(initialData.calendarDays, dto.collection, true);
        return row;
      })
      .sort((a: ScheduleRow, b: ScheduleRow) => a.value.employee.secondName.localeCompare(b.value.employee.secondName));

    result.groups = [group];
    return result;
  }
}
