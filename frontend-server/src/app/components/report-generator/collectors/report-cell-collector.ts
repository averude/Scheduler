import { CellEnabledSetter } from "../../../shared/collectors/cell-enabled-setter";
import { CellCollector } from "../../../shared/collectors/cell-collector";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";
import { DayType } from "../../../model/day-type";
import { ReportCellValue } from "../model/report-cell-value";
import * as moment from "moment";
import { ReportCollectorStrategy } from "./strategy/report-collector-strategy";
import { Injectable } from "@angular/core";

@Injectable()
export class ReportCellCollector {

  constructor(private cellEnabledSetter: CellEnabledSetter,
              private cellCollector: CellCollector) {
  }

  collectCells(collectorStrategy: ReportCollectorStrategy,
               dto: EmployeeScheduleDTO,
               calendarDays: CalendarDay[],
               intervals: RowInterval[],
               dayTypeMap: Map<number, DayType>,
               useReportLabel: boolean) {
    const cells = this.cellCollector.collectByFn(calendarDays, dto.collection, (date => {
      const cell = {date: date} as ReportCellValue;
      collectorStrategy.fillDisabledCell(cell);
      return cell;
    }), ((cell, hasDate) => cell.workDay = hasDate));

    const from = moment.utc(calendarDays[0].isoString);
    const to = moment.utc(calendarDays[calendarDays.length - 1].isoString);

    this.cellEnabledSetter.processCells(cells, intervals, from, to, (cell => {
      collectorStrategy.fillCellWithValue(cell, cell.workDay, dayTypeMap, useReportLabel);
    }));

    return cells;
  }
}
