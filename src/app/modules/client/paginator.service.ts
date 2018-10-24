import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PaginatorService {

  private subject: Subject<CalendarDates> = new Subject<CalendarDates>();

  constructor() {}

  sendDates(prevDates: Date[], currDates: Date[], nextDates: Date[]): void {
    this.subject.next({
      prevDates: prevDates,
      currDates: currDates,
      nextDates: nextDates});
  }

  get calendarDates(): Observable<CalendarDates> {
    return this.subject.asObservable();
  }
}

export class CalendarDates {
  prevDates: Date[];
  currDates: Date[];
  nextDates: Date[];
}
