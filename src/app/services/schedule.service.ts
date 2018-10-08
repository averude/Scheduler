import { Injectable } from '@angular/core';
import {Schedule} from '../model/schedule';
import {SCHEDULE} from '../datasource/mock-schedule';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  schedule: Schedule[] = SCHEDULE;

  constructor() { }

  getByDate(start: Date, end: Date, employeeId: number): Observable<Schedule[]> {
    return of(this.schedule.filter(
      value => value.employeeId === employeeId)
    ).pipe(delay(600));
  }

  create(schedule: Schedule) {
    this.schedule.push(schedule);
  }
}
