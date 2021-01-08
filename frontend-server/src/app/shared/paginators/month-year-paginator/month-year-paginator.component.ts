import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from "moment";
import { DurationInputArg1, DurationInputArg2, Moment } from "moment";
import { MatDatepicker } from "@angular/material/datepicker";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { IPaginationStrategy } from "../pagination-strategy/i-pagination-strategy";
import { Subject, Subscription } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-month-year-paginator',
  templateUrl: './month-year-paginator.component.html',
  styleUrls: ['./month-year-paginator.component.css']
})
export class MonthYearPaginatorComponent implements OnInit, OnDestroy {
  @Input() paginationStrategy:  IPaginationStrategy;
  @Input() dateUnit: DurationInputArg2 = 'month';

  @Output() onDateChange: EventEmitter<void> = new EventEmitter<void>();

  private limiter:  Subject<any> = new Subject();
  private dateStep: DurationInputArg1 = 1;

  currentDate:      Moment;
  firstDayOfMonth:  Moment;
  lastDayOfMonth:   Moment;

  constructor(private datePaginationService: PaginationService) {}

  private limiterSub: Subscription;

  ngOnInit() {
    this.limiterSub = this.limiter
      .asObservable()
      .pipe(
        debounceTime(400),
        switchMap(values => this.paginationStrategy.getPaginationObject(values[0], values[1], values[2]))
      )
      .subscribe(value => this.datePaginationService.change(value));

    this.initCurrentDate();
  }

  ngOnDestroy(): void {
    this.limiterSub.unsubscribe();
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
    this.onDateChange.emit();

    this.initFirstAndLastDaysOfDateUnit();
    if (this.paginationStrategy) {
      let values = [this.currentDate, this.firstDayOfMonth, this.lastDayOfMonth];
      this.limiter.next(values);
    }
  }
}
