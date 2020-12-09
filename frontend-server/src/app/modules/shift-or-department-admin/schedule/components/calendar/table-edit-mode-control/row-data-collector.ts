import { Employee } from "../../../../../../model/employee";
import { MainShiftComposition } from "../../../../../../model/main-shift-composition";
import { SchedulerRowData } from "../model/scheduler-row-data";
import { Injectable } from "@angular/core";
import { WorkDay } from "../../../../../../model/workday";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { CellData } from "../../../../../../lib/ngx-schedule-table/model/data/cell-data";
import { BasicDto } from "../../../../../../model/dto/basic-dto";
import * as moment from "moment";
import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";

@Injectable()
export class RowDataCollector {

  public getRowData(rowGroup: RowGroupData,
                    dto: BasicDto<Employee, WorkDay>,
                    calendarDays: CalendarDay[],
                    composition: MainShiftComposition,
                    workingNorm: number) {
    return {
      parent: rowGroup,
      id: dto.parent.id,
      employee: dto.parent,
      composition: composition,
      isSubstitution: false,
      workingNorm: workingNorm,
      cellData: this.getCellData(composition, dto.collection, calendarDays)
    } as SchedulerRowData;
  }

  private getCellData(shiftComposition: MainShiftComposition,
                      workDays: WorkDay[],
                      calendarDays: CalendarDay[]) {
    let sched_idx = 0;
    return calendarDays.map(day => {
      const utc_date = moment.utc(day.isoString);

      const cellData: CellData = {
        date: day,
        value: null,
        enabled: utc_date.isBetween(shiftComposition.from, shiftComposition.to, 'date','[]'),
      };

      let workDay = workDays[sched_idx];
      if (workDay && workDay.date === day.isoString) {
        cellData.value = workDay;
        sched_idx++;
      }

      return cellData;
    });
  }
}
