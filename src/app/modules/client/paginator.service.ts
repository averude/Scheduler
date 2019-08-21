import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PaginatorService {

  private emptyDates: CalendarDates = {
    prevDates: [],
    currDates: [],
    nextDates: []
  };
  private subject: BehaviorSubject<CalendarDates> = new BehaviorSubject<CalendarDates>(this.emptyDates);

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
