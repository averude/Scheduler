import { Component, OnInit } from '@angular/core';
import { PaginatorService } from '../../paginator.service';

@Component({
  selector: 'app-client-table-paginator',
  templateUrl: './schedule-table-paginator.component.html',
  styleUrls: ['./schedule-table-paginator.component.css']
})
export class ScheduleTablePaginatorComponent implements OnInit {

  prevDays: Date[] = [];
  currDays: Date[] = [];
  nextDays: Date[] = [];

  currMonth: number;
  currYear: number;

  constructor(private paginatorService: PaginatorService) { }

  ngOnInit() {
    const currDate = new Date();
    this.currYear = currDate.getFullYear();
    this.currMonth = currDate.getMonth();
    this.calcDays();
    this.paginatorService.sendDates(this.prevDays, this.currDays, this.nextDays);
  }

  nextMonth(): void {
    if (this.currMonth === 11) {
      this.currMonth = 0;
      this.currYear++;
    } else {
      this.currMonth++;
    }
    this.calcDays();
    this.paginatorService.sendDates(this.prevDays, this.currDays, this.nextDays);
  }

  prevMonth(): void {
    if (this.currMonth === 0) {
      this.currMonth = 11;
      this.currYear--;
    } else {
      this.currMonth--;
    }
    this.calcDays();
    this.paginatorService.sendDates(this.prevDays, this.currDays, this.nextDays);
  }

  private calcDays(): void {
    this.calcCurrDays();
    this.calcPrevDays();
    this.calcNextDays();
  }

  private calcCurrDays(): void {
    this.currDays.length = 0;
    const daysNum = new Date(
      this.currYear,
      this.currMonth + 1,
      0).getDate();
    for (let i = 0; i < daysNum; i++) {
      this.currDays[i] = new Date(Date.UTC(this.currYear, this.currMonth, i + 1));
    }
  }

  private calcPrevDays(): void {
    this.prevDays.length = 0;
    const firstDay = this.currDays[0].getDay() - 1;
    const daysNum = new Date(this.currYear, this.currMonth, 0).getDate();
    for (let i = 0, j = firstDay - 1; j >= 0; i++, j--) {
      this.prevDays[i] = new Date(Date.UTC(
        this.currYear,
        this.currMonth - 1,
        daysNum - j));
    }
  }

  private calcNextDays(): void {
    this.nextDays.length = 0;
    const lastDay = this.currDays[this.currDays.length - 1].getDay();
    for (let i = 0; i < 7 - lastDay; i++) {
      this.nextDays[i] = new Date(Date.UTC(this.currYear, this.currMonth + 1, i + 1));
    }
  }
}
