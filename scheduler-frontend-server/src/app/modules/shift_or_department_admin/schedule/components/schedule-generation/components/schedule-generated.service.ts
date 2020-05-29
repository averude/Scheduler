import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleGeneratedService {
  private subject: Subject<void> = new Subject();

  inform() {
    this.subject.next();
  }

  generated(): Observable<void> {
    return this.subject.asObservable();
  }
}
