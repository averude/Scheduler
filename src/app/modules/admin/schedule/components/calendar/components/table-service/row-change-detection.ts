import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class RowChangeDetection {
  private subject: Subject<number> = new Subject();

  markForChange(employeeId: number) {
    this.subject.next(employeeId);
  }

  get onChange(): Observable<number> {
    return this.subject.asObservable();
  }
}
