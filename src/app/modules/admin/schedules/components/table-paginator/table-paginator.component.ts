import { Component, OnInit } from '@angular/core';
import { PaginatorService } from '../../paginator.service';
import { dateToISOString } from "../../../../../shared/utils";
import { CalendarDay } from "../../../../../model/ui/calendar-day";
import { HolidayService } from "../../../../../services/holiday.service";
import { Holiday } from "../../../../../model/holiday";

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnInit {

  currentDate: Date;
  daysInMonth: CalendarDay[] = [];
  year: number;
  month: number;

  holidays: Holiday[] = [];

  constructor(private paginatorService: PaginatorService,
              private holidayService: HolidayService) { }

  ngOnInit() {
    this.initCurrentMonth();
    this.holidayService.getAll()
      .subscribe(holidays => {
        this.holidays = holidays;
        this.initCurrentMonth();
      });
  }

  initCurrentMonth() {
    this.currentDate = new Date();
    this.month = this.currentDate.getMonth();
    this.year = this.currentDate.getFullYear();
    this.calculateDaysInMonth();
    this.paginatorService.changeDate(this.daysInMonth);
  }

  nextMonth() {
    if (this.month === 11) {
      this.currentDate.setUTCFullYear(++this.year);
      this.month = 0;
    } else {
      this.month += 1;
    }
    this.currentDate.setUTCMonth(this.month);
    this.calculateDaysInMonth();
    this.paginatorService.changeDate(this.daysInMonth);
  }

  prevMonth() {
    if (this.month === 0) {
      this.currentDate.setUTCFullYear(--this.year);
      this.month = 11;
    } else {
      this.month--;
    }
    this.currentDate.setUTCMonth(this.month);
    this.calculateDaysInMonth();
    this.paginatorService.changeDate(this.daysInMonth);
  }

  calculateDaysInMonth() {
    this.daysInMonth.length = 0;
    const daysNum = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 0; i < daysNum; i++) {
      const date = new Date(Date.UTC(this.year, this.month, i + 1));

      let holiday = this.holidays
        .find(value => value.date.getTime() === date.getTime());

      this.daysInMonth[i] = {
        isoString: dateToISOString(date),
        dayOfMonth: date.getUTCDate(),
        dayOfWeek: date.getUTCDay(),
        holiday: holiday ? true : false,
        weekend: date.getUTCDay() == 0 || date.getUTCDay() == 6
      };
    }
  }
}
