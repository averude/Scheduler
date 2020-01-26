import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Moment } from "moment";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { Holiday } from "../../../model/holiday";
import { ExtraWeekend } from "../../../model/extra-weekend";
import { HolidayService } from "../../../http-services/holiday.service";
import { ExtraWeekendService } from "../../../http-services/extra-weekend.service";
import { forkJoin } from "rxjs";
import { MatDatepicker } from "@angular/material/datepicker";
import { ExtraWorkdayService } from "../../../http-services/extra-workday.service";
import { ExtraWorkDay } from "../../../model/extra-workday";
import { DatePaginationService } from "../../../lib/ngx-schedule-table/service/date-pagination.service";

@Component({
  selector: 'app-month-year-paginator',
  templateUrl: './month-year-paginator.component.html',
  styleUrls: ['./month-year-paginator.component.css']
})
export class MonthYearPaginatorComponent implements OnInit {
  currentDate:      Moment;
  firstDayOfMonth:  Moment;
  lastDayOfMonth:   Moment;

  daysInMonth: CalendarDay[] = [];

  holidays:       Holiday[]     = [];
  extraWeekends:  ExtraWeekend[] = [];
  extraWorkDays:  ExtraWorkDay[] = [];

  constructor(private datePaginationService: DatePaginationService,
              private holidayService: HolidayService,
              private extraWeekendService: ExtraWeekendService,
              private extraWorkDayService: ExtraWorkdayService) {}

  ngOnInit() {
    this.initCurrentMonth();
  }

  initCurrentMonth() {
    this.currentDate = moment.utc();
    this.changeDate();
  }

  nextMonth() {
    this.currentDate = this.currentDate.add(1, 'month');
    this.changeDate();
  }

  prevMonth() {
    this.currentDate = this.currentDate.subtract(1, 'month');
    this.changeDate();
  }

  onMonthSelected(selectedDate: Moment, datepicker: MatDatepicker<Moment>) {
    this.currentDate = selectedDate;
    datepicker.close();
    this.changeDate();
  }

  private initFirstAndLastDaysOfMonth() {
    this.firstDayOfMonth = this.currentDate.clone().startOf('month');
    this.lastDayOfMonth  = this.currentDate.clone().endOf('month');
  }

  private changeDate() {
    this.initFirstAndLastDaysOfMonth();
    let firstDayOfMonthString = this.firstDayOfMonth.format("YYYY-MM-DD");
    let lastDayOfMonthString  = this.lastDayOfMonth.format("YYYY-MM-DD");

    forkJoin(
      this.holidayService.getAllByAuthAndDateBetween(firstDayOfMonthString, lastDayOfMonthString),
      this.extraWeekendService.getAllByAuthAndDateBetween(firstDayOfMonthString, lastDayOfMonthString),
      this.extraWorkDayService.getAllByAuthAndDateBetween(firstDayOfMonthString, lastDayOfMonthString)
    ).subscribe(values => {
      this.holidays = values[0];
      this.extraWeekends = values[1];
      this.extraWorkDays = values[2];

      this.calculateDaysInMonth();
      this.datePaginationService.changeDate(this.daysInMonth);
    });
  }

  private calculateDaysInMonth() {
    this.daysInMonth.length = 0;
    const daysNum = this.currentDate.daysInMonth();
    const day = this.currentDate.clone().startOf('month');

    for (let i = 0; i < daysNum; i++) {
      let holiday = this.holidays
        .find(value => day.isSame(value.date, 'date'));

      let extraWeekend = this.extraWeekends
        .find(value => day.isSame(value.date, 'date'));

      let extraWorkDay = this.extraWorkDays
        .find(value => day.isSame(value.date, 'date'));

      this.daysInMonth[i] = {
        isoString: day.format("YYYY-MM-DD"),
        dayOfMonth: day.date(),
        dayOfWeek: day.weekday(),
        holiday: !!holiday,
        weekend: (day.weekday() == 0 || day.weekday() == 6 || !!extraWeekend) && !extraWorkDay
      };

      day.add(1, 'day');
    }
  }
}
