import { APaginationStrategy } from "./a-pagination-strategy";
import { Moment } from "moment";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class SimplePaginationStrategy extends APaginationStrategy {
  getPaginationObject(currentDate: Moment,
                      firstDayOfMonth: Moment,
                      lastDayOfMonth: Moment): Observable<any> {
    return of({
        firstDayOfMonth: firstDayOfMonth.format("YYYY-MM-DD"),
        lastDayOfMonth: lastDayOfMonth.format("YYYY-MM-DD")
      });
  }
}
