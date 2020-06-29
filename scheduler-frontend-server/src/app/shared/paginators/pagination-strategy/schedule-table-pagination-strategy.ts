import { Injectable } from "@angular/core";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { HolidayService } from "../../../services/http/holiday.service";
import { ExtraWeekendService } from "../../../services/http/extra-weekend.service";
import { ExtraWorkdayService } from "../../../services/http/extra-workday.service";
import * as moment from "moment";
import { Moment } from "moment";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPaginationStrategy } from "./i-pagination-strategy";

@Injectable()
export class ScheduleTablePaginationStrategy implements IPaginationStrategy {

  constructor(private holidayService:       HolidayService,
              private extraWeekendService:  ExtraWeekendService,
              private extraWorkDayService:  ExtraWorkdayService) {
  }

  getPaginationObject(selectedDate: Moment,
                      firstDay:     Moment,
                      lastDay:      Moment): Observable<any> {
    let firstDayOfMonthString = firstDay.format("YYYY-MM-DD");
    let lastDayOfMonthString = lastDay.format("YYYY-MM-DD");

    return forkJoin([
      this.holidayService.getAll(firstDayOfMonthString, lastDayOfMonthString),
      this.extraWeekendService.getAll(firstDayOfMonthString, lastDayOfMonthString),
      this.extraWorkDayService.getAll(firstDayOfMonthString, lastDayOfMonthString)
    ]).pipe(map(values => {
      return this.calculateDaysInMonth(selectedDate,
        values[0].map(value => value.date),
        values[1].map(value => value.date),
        values[2].map(value => value.date));
    }));
  }

  public calculateDaysInMonth(selectedDate:   Moment,
                              holidays:       string[],
                              extraWeekends:  string[],
                              extraWorkDays:  string[]): CalendarDay[] {
    const currDateIso = moment().format("YYYY-MM-DD");

    let daysInMonth: CalendarDay[] = [];

    const daysNum = selectedDate.daysInMonth();
    const day = selectedDate.clone().startOf('month');

    for (let i = 0; i < daysNum; i++) {
      let isoString = day.format("YYYY-MM-DD");

      let isHoliday       = holidays.includes(isoString);
      let isExtraWeekend  = extraWeekends.includes(isoString);
      let isExtraWorkDay  = extraWorkDays.includes(isoString);

      daysInMonth[i] = {
        isoString: isoString,
        dayOfMonth: day.date(),
        dayOfWeek: day.weekday(),
        holiday: isHoliday,
        weekend: (day.weekday() == 0 || day.weekday() == 6 || isExtraWeekend) && !isExtraWorkDay,
        isNow:   currDateIso === isoString
      };

      day.add(1, 'day');
    }

    return daysInMonth;
  }
}
