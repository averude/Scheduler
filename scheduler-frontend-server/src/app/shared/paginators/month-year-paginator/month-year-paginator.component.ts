import { Component, Input, OnInit } from '@angular/core';
import * as moment from "moment";
import { DurationInputArg1, DurationInputArg2, Moment } from "moment";
import { MatDatepicker } from "@angular/material/datepicker";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { APaginationStrategy } from "../pagination-strategy/a-pagination-strategy";

@Component({
  selector: 'app-month-year-paginator',
  templateUrl: './month-year-paginator.component.html',
  styleUrls: ['./month-year-paginator.component.css']
})
export class MonthYearPaginatorComponent implements OnInit {
  @Input() paginationStrategy:  APaginationStrategy;
  @Input() dateUnit: DurationInputArg2 = 'month';

  private dateStep: DurationInputArg1 = 1;

  currentDate:      Moment;
  firstDayOfMonth:  Moment;
  lastDayOfMonth:   Moment;

  constructor(private datePaginationService: PaginationService) {}

  ngOnInit() {
    this.initCurrentDate();
  }

  private initCurrentDate() {
    this.currentDate = moment.utc();
    this.changeDate();
  }

  nextDate() {
    this.currentDate = this.currentDate.add(this.dateStep, this.dateUnit);
    this.changeDate();
  }

  prevDate() {
    this.currentDate = this.currentDate.subtract(this.dateStep, this.dateUnit);
    this.changeDate();
  }

  onMonthSelected(selectedDate: Moment, datepicker: MatDatepicker<Moment>) {
    this.currentDate = selectedDate;
    datepicker.close();
    this.changeDate();
  }

  onYearSelected(selectedDate: Moment, datepicker: MatDatepicker<Moment>) {
    if (this.dateUnit === 'year') {
      this.currentDate = selectedDate;
      datepicker.close();
      this.changeDate();
    }
  }

  dateString(): string {
    switch (this.dateUnit) {
      case 'year' : return this.currentDate.format("YYYY");
      case 'month' : return this.currentDate.format("MMMM YYYY");
    }
  }

  private initFirstAndLastDaysOfDateUnit() {
    this.firstDayOfMonth = this.currentDate.clone().startOf(this.dateUnit);
    this.lastDayOfMonth  = this.currentDate.clone().endOf(this.dateUnit);
  }

  private changeDate() {
    this.initFirstAndLastDaysOfDateUnit();
    if (this.paginationStrategy) {
      this.paginationStrategy
        .getPaginationObject(this.currentDate, this.firstDayOfMonth, this.lastDayOfMonth)
        .subscribe(value => this.datePaginationService.change(value));
    }
  }
}
