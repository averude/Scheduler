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
      from: firstDay.format("YYYY-MM-DD"),
      to:   lastDay.format("YYYY-MM-DD")
    };
  }
}

export const DEFAULT_PAGINATION_STRATEGY = new SimplePaginationStrategy();
