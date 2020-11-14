import { IPaginationStrategy } from "./i-pagination-strategy";
import { Moment } from "moment";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class SimplePaginationStrategy implements IPaginationStrategy {
  getPaginationObject(currentDate: Moment,
                      firstDay: Moment,
                      lastDay: Moment): Observable<any> {
    return of({
        firstDayOfMonth: firstDay.format("YYYY-MM-DD"),
        lastDayOfMonth: lastDay.format("YYYY-MM-DD")
      });
  }
}
