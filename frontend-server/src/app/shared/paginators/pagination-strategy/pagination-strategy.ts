import { Moment } from "moment";

export interface PaginationStrategy {
  getPaginationObject(selectedDate: Moment,
                      firstDay:     Moment,
                      lastDay:      Moment): any;
}

export class SimplePaginationStrategy implements PaginationStrategy {
  getPaginationObject(currentDate: Moment,
                      firstDay: Moment,
                      lastDay: Moment): any {
    return {
      firstDayOfMonth: firstDay.format("YYYY-MM-DD"),
      lastDayOfMonth: lastDay.format("YYYY-MM-DD")
    };
  }
}

export const DEFAULT_PAGINATION_STRATEGY = new SimplePaginationStrategy();
