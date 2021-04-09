import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from "moment";
import { DurationInputArg1, DurationInputArg2, Moment } from "moment";
import { MatDatepicker } from "@angular/material/datepicker";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { IPaginationStrategy } from "../pagination-strategy/i-pagination-strategy";
import { Subject, Subscription } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { DATE_FORMAT } from "../../utils/utils";

@Component({
  selector: 'app-month-year-paginator',
  templateUrl: './month-year-paginator.component.html',
  styleUrls: ['./month-year-paginator.component.css'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},]
})
export class MonthYearPaginatorComponent implements OnInit, OnDestroy {
  @Input() paginationStrategy:  IPaginationStrategy;
  @Input() dateUnit: DurationInputArg2 = 'month';

  @Input() type: 'single' | 'range' = 'single';

  @Output() onDateChange: EventEmitter<void> = new EventEmitter<void>();

  private limiter:  Subject<any> = new Subject();
  private dateStep: DurationInputArg1 = 1;

  currentDate:  Moment;
  fromDate:     Moment;
  toDate:       Moment;

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
      let values = [this.currentDate, this.fromDate, this.toDate];
      this.limiter.next(values);
    }
  }
}
