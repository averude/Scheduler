import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class CellStateService {
  private subject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  nextStatus(status: number) {
    this.subject.next(status);
  }

  get isShown(): Observable<number> {
    return this.subject.asObservable();
  }
}
