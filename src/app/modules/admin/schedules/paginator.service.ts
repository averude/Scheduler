import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PaginatorService {
  private subject: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);

  changeDate(daysInMonth: Date[]) {
    this.subject.next(daysInMonth);
  }

  get dates(): Observable<Date[]> {
    return this.subject.asObservable();
  }
}
