import { Component, Input, OnInit } from '@angular/core';
import * as moment from "moment";
import { Moment } from "moment";
import { MatDatepicker } from "@angular/material/datepicker";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { APaginationStrategy } from "../pagination-strategy/a-pagination-strategy";

@Component({
  selector: 'app-month-year-paginator',
  templateUrl: './month-year-paginator.component.html',
  styleUrls: ['./month-year-paginator.component.css']
})
export class MonthYearPaginatorComponent implements OnInit {
  @Input() paginationStrategy: APaginationStrategy;

  currentDate:      Moment;
  firstDayOfMonth:  Moment;
  lastDayOfMonth:   Moment;

  constructor(private datePaginationService: PaginationService) {}

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
    if (this.paginationStrategy) {
      this.paginationStrategy
        .getPaginationObject(this.currentDate, this.firstDayOfMonth, this.lastDayOfMonth)
        .subscribe(value => this.datePaginationService.change(value));
    }
  }
}
