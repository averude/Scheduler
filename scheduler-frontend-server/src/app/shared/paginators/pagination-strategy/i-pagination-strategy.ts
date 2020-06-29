import { Moment } from "moment";
import { Observable } from "rxjs";

export interface IPaginationStrategy {
  getPaginationObject(selectedDate: Moment,
                      firstDay:     Moment,
                      lastDay:      Moment): Observable<any>;
}
