import { Component, OnInit } from '@angular/core';
import { PaginatorService } from '../../paginator.service';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnInit {

  currentDate: Date;
  daysInMonth: Date[] = [];
  year: number;
  month: number;

  constructor(private paginatorService: PaginatorService) { }

  ngOnInit() {
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
      this.daysInMonth[i] = new Date(Date.UTC(this.year, this.month, i + 1));
    }
  }
}
