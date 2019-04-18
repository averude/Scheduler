import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatorService } from '../../paginator.service';
import { ScheduleService } from '../../../../services/schedule.service';
import { switchMap } from 'rxjs/internal/operators';
import { WorkDay } from '../../../../model/workday';
import { AuthService } from "../../../../services/auth.service";
import { dateToISOString } from "../../../../shared/utils";

@Component({
  selector: 'app-client-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit, OnDestroy {

  columnHeaders: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  prevDays: Date[] = [];
  currDays: Date[] = [];
  nextDays: Date[] = [];

  schedule: WorkDay[];

  private sub: Subscription;

  constructor(private authService: AuthService,
              private scheduleService: ScheduleService,
              private paginatorService: PaginatorService) { }

  ngOnInit() {
    const id = this.authService.currentUserValue.employeeId;
    this.sub = this.paginatorService.calendarDates
      .pipe(
        switchMap(dates => {
          console.log(dates);
          this.prevDays = dates.prevDates;
          this.currDays = dates.currDates;
          this.nextDays = dates.nextDates;
          return this.scheduleService.getByDate(
            dateToISOString(this.currDays[0]),
            dateToISOString(this.currDays[this.currDays.length - 1]),
            id
          );
      }))
      .subscribe(schedule => this.schedule = schedule);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    console.log(this.sub);
  }

  getWorkDay(day: Date): WorkDay | void {
    if (this.schedule) {
      return this.schedule
        .find(value => value.date === dateToISOString(day));
    }
  }

  logout() {
    this.authService.logout();
  }
}
