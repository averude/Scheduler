import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Moment } from "moment";
import { PaginationService } from "../pagination.service";

@Component({
  selector: 'app-year-paginator',
  templateUrl: './year-paginator.component.html',
  styleUrls: ['./year-paginator.component.css']
})
export class YearPaginatorComponent implements OnInit {

  currentDate:      Moment;
  firstDateOfYear:  Moment;
  lastDateOfYear:   Moment;

  constructor(private paginationService: PaginationService) { }

  ngOnInit() {
    this.paginationService.clearStoredValue();
    this.initCurrentYear();
  }

  initCurrentYear() {
    this.currentDate = moment.utc();
    this.changeDate();
  }

  prevYear() {
    this.currentDate = this.currentDate.subtract(1, 'year');
    this.changeDate();
  }

  nextYear() {
    this.currentDate = this.currentDate.add(1, 'year');
    this.changeDate();
  }

  private initFirstAndLastDatesOfYear() {
    this.firstDateOfYear = this.currentDate.clone().startOf('year');
    this.lastDateOfYear  = this.currentDate.clone().endOf('year');
  }

  private changeDate() {
    this.initFirstAndLastDatesOfYear();
    const from = this.firstDateOfYear.format("YYYY-MM-DD");
    const to   = this.lastDateOfYear.format("YYYY-MM-DD");

    this.paginationService.change({from: from, to: to});
  }
}
