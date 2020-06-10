import { Injectable } from "@angular/core";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { HolidayService } from "../../../services/http/holiday.service";
import { ExtraWeekendService } from "../../../services/http/extra-weekend.service";
import { ExtraWorkdayService } from "../../../services/http/extra-workday.service";
import { Moment } from "moment";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { APaginationStrategy } from "./a-pagination-strategy";

@Injectable()
export class ScheduleTablePaginationStrategy implements APaginationStrategy {

  constructor(private holidayService: HolidayService,
              private extraWeekendService: ExtraWeekendService,
              private extraWorkDayService: ExtraWorkdayService) {
  }

  getPaginationObject(currentDate: Moment,
                      firstDayOfMonth: Moment,
                      lastDayOfMonth: Moment): Observable<CalendarDay[]> {
    let firstDayOfMonthString = firstDayOfMonth.format("YYYY-MM-DD");
    let lastDayOfMonthString = lastDayOfMonth.format("YYYY-MM-DD");

    return forkJoin([
      this.holidayService.getAll(firstDayOfMonthString, lastDayOfMonthString),
      this.extraWeekendService.getAll(firstDayOfMonthString, lastDayOfMonthString),
      this.extraWorkDayService.getAll(firstDayOfMonthString, lastDayOfMonthString)
    ]).pipe(map(values => {
      return this.calculateDaysInMonth(currentDate,
        values[0].map(value => value.date),
        values[1].map(value => value.date),
        values[2].map(value => value.date));
    }));
  }

  public calculateDaysInMonth(currentDate:    Moment,
                              holidays:       string[],
                              extraWeekends:  string[],
                              extraWorkDays:  string[]): CalendarDay[] {
    let daysInMonth: CalendarDay[] = [];

    const daysNum = currentDate.daysInMonth();
    const day = currentDate.clone().startOf('month');

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
        weekend: (day.weekday() == 0 || day.weekday() == 6 || isExtraWeekend) && !isExtraWorkDay
      };

      day.add(1, 'day');
    }

    return daysInMonth;
  }
}
