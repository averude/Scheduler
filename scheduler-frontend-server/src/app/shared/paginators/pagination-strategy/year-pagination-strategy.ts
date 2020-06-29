import { IPaginationStrategy } from "./i-pagination-strategy";
import { Moment } from "moment";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class YearPaginationStrategy implements IPaginationStrategy {

  getPaginationObject(currentDate: Moment,
                      firstDay:    Moment,
                      lastDay:     Moment): Observable<any> {
    return of(this.calculateMonthInYear(currentDate));
  }

  private calculateMonthInYear(currentDate: Moment): any {
    let date = currentDate.clone().startOf('year');
    const result = [];

    for (let monthIdx = 1; monthIdx <= 12; monthIdx++) {
      let month = date.clone().startOf('month');

      result.push({
        isoString: month.format("YYYY-MM-DD"),
        monthName: month.format("MMMM")
      });
      date.add(1, 'month');
    }

    return result;
  }
}
