import { CalendarDay } from "../../lib/ngx-schedule-table/model/calendar-day";
import { SpecialCalendarDate } from "../../model/special-calendar-date";
import * as moment from "moment";
import { Moment } from "moment";
import { Injectable } from "@angular/core";

@Injectable()
export class CalendarDaysCalculator {

  calculateCalendarDays(from: Moment,
                        to: Moment,
                        specialCalendarDates: SpecialCalendarDate[]): CalendarDay[] {
    const currDateIso = moment().format("YYYY-MM-DD");
    const daysInMonth: CalendarDay[] = [];

    const daysNum = to.clone().add(1, 'day').diff(from, 'days');
    const day = from.clone();

    for (let i = 0; i < daysNum; i++) {
      const isoString = day.format("YYYY-MM-DD");

      // Temporary
      const specialCalendarDate = specialCalendarDates.find(value => value.date === isoString);

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
