import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ShowHoursService {
  private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  show(status: boolean) {
    this.subject.next(status);
  }

  get isShown(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
