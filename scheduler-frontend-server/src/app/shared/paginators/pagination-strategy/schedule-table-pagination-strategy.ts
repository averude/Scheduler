import { Injectable } from "@angular/core";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import * as moment from "moment";
import { Moment } from "moment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPaginationStrategy } from "./i-pagination-strategy";
import { SpecialCalendarDateService } from "../../../services/http/special-calendar-date.service";
import { SpecialCalendarDate } from "../../../model/special-calendar-date";

@Injectable()
export class ScheduleTablePaginationStrategy implements IPaginationStrategy {

  constructor(private specialCalendarDateService: SpecialCalendarDateService) {
  }

  getPaginationObject(selectedDate: Moment,
                      firstDay:     Moment,
                      lastDay:      Moment): Observable<any> {
    let firstDayOfMonthString = firstDay.format("YYYY-MM-DD");
    let lastDayOfMonthString = lastDay.format("YYYY-MM-DD");

    return this.specialCalendarDateService.getAll(firstDayOfMonthString, lastDayOfMonthString)
      .pipe(map(specialCalendarDates => this.calcDaysInMonth(selectedDate, specialCalendarDates)));
  }

  calcDaysInMonth(selectedDate: Moment,
                  specialCalendarDates: SpecialCalendarDate[]): CalendarDay[] {
    const currDateIso = moment().format("YYYY-MM-DD");

    let daysInMonth: CalendarDay[] = [];

    const daysNum = selectedDate.daysInMonth();
    const day = selectedDate.clone().startOf('month');

    for (let i = 0; i < daysNum; i++) {
      let isoString = day.format("YYYY-MM-DD");

      // Temporary
      let specialCalendarDate = specialCalendarDates.find(value => value.date === isoString);

      daysInMonth[i] = {
        isoString: isoString,
        dayOfMonth: day.date(),
        dayOfWeek: day.weekday(),
        holiday: this.checkSpecialDate(specialCalendarDate, 'holiday'),
        weekend: this.isWeekend(day, specialCalendarDate),
        isNow:   currDateIso === isoString
      };

      day.add(1, 'day');
    }

    return daysInMonth;
  }

  private checkSpecialDate(specialCalendarDate: SpecialCalendarDate, type: string) {
    return specialCalendarDate && specialCalendarDate.dateType === type;
  }

  private isWeekend(day: Moment, specialDate: SpecialCalendarDate) {
    return (day.weekday() == 0 || day.weekday() == 6
      || this.checkSpecialDate(specialDate, 'extra_weekend'))
      && !this.checkSpecialDate(specialDate, 'extra_work_day');
  }
}
