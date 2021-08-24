import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from "moment";
import { DurationInputArg1, DurationInputArg2, Moment } from "moment";
import { MatDatepicker } from "@angular/material/datepicker";
import { DEFAULT_PAGINATION_STRATEGY, PaginationStrategy } from "../pagination-strategy/pagination-strategy";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { DATE_FORMAT } from "../../utils/utils";
import { PaginationService } from "../pagination.service";

@Component({
  selector: 'app-month-year-paginator',
  templateUrl: './month-year-paginator.component.html',
  styleUrls: ['./month-year-paginator.component.css'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},]
})
export class MonthYearPaginatorComponent implements OnInit, OnDestroy {

  @Input() paginationStrategy:  PaginationStrategy = DEFAULT_PAGINATION_STRATEGY;
  @Input() dateUnit: DurationInputArg2 = 'month';

  @Input() type: 'single' | 'range' = 'single';

  @Output() onDateChange: EventEmitter<void> = new EventEmitter<void>();

  private dateStep: DurationInputArg1 = 1;

  currentDate:  Moment;
  fromDate:     Moment;
  toDate:       Moment;

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.initCurrentDate();
  }

  ngOnDestroy(): void {
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

  onMonthSelected(selectedDate: Moment,
                  datepicker: MatDatepicker<Moment>) {
    this.currentDate = selectedDate;
    datepicker.close();
    this.changeDate();
  }

  onYearSelected(selectedDate: Moment,
                 datepicker: MatDatepicker<Moment>) {
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
    this.fromDate = this.currentDate.clone().startOf(this.dateUnit);
    this.toDate  = this.currentDate.clone().endOf(this.dateUnit);
  }

  changeDate() {
    this.initFirstAndLastDaysOfDateUnit();
    this.load();
  }

  load() {
    this.onDateChange.emit();

    if (this.paginationStrategy) {
      const value = this.paginationStrategy.getPaginationObject(this.currentDate, this.fromDate, this.toDate);
      this.paginationService.change(value);
    }
  }
}
