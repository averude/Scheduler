import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatorService } from '../../paginator.service';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../../../services/schedule.service';
import { mergeMap } from 'rxjs/internal/operators';
import { WorkDay } from '../../../../model/workday';

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

  constructor(private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private paginatorService: PaginatorService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('clientId');
    this.sub = this.paginatorService.calendarDates
      .pipe(mergeMap(dates => {
        this.prevDays = dates.prevDates;
        this.currDays = dates.currDates;
        this.nextDays = dates.nextDates;
        return this.scheduleService.getByDate(
          this.currDays[0],
          this.currDays[this.currDays.length - 1],
          id
        );
      }))
      .subscribe(schedule => this.schedule = schedule);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getWorkDay(day: Date): WorkDay | void {
    if (this.schedule) {
      const dateISO = day.toISOString().split('T')[0];
      return this.schedule
        .find(value => value.date === dateISO);
    }
  }
}
