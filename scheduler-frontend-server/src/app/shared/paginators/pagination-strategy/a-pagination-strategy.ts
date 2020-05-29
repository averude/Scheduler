import { Moment } from "moment";
import { Observable } from "rxjs";

export abstract class APaginationStrategy {
  abstract getPaginationObject(currentDate: Moment,
                               firstDayOfMonth: Moment,
                               lastDayOfMonth: Moment): Observable<any>;
}
