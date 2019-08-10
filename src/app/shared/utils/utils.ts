import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export const parseDateOfEntities: OperatorFunction<any, any> =
  map((response: Array<any>) => response.map(value => {
    value.date = new Date(value.date);
    return value;
  }));

export function dateToISOString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6;
}
