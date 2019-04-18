import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable()
export class PaginatorService {
  private lastValue: any = null;
  private subject: Subject<any> = new Subject();

  changeDate(value: any) {
    this.lastValue = value;
    this.subject.next(value);
  }

  get dates(): Observable<any> {
    return this.subject.asObservable()
      .pipe(filter(value => !!value));
  }

  getLastValue(): any {
    return this.lastValue;
  }
}
