import { InitialData } from "../../../model/datasource/initial-data";
import { ScheduleCell, ScheduleRow, ScheduleRowGroup, TableData } from "../../../model/ui/schedule-table/table-data";
import { CellCollector } from "../../../services/collectors/cell-collector";
import { WorkDay } from "../../../model/workday";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleViewDataCollector {

  constructor(private cellCollector: CellCollector){
  }

  collect(initialData: InitialData): TableData {

    const result = new TableData();
    const group = new ScheduleRowGroup();
    group.rows = initialData.scheduleDto.map(dto => {
      const row = {} as ScheduleRow;
      row.employee = dto.parent;
      row.cells = this.cellCollector.collect<WorkDay, ScheduleCell>(initialData.calendarDays, dto.collection, true);
      return row;
    });

    result.groups = [group];
    return result;
  }
}
