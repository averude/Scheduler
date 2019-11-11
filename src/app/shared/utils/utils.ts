import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";
import { Employee } from "../../model/employee";

export const parseDateOfEntities: OperatorFunction<any, any> =
  map((response: Array<any>) => response.map(value => {
    value.date = new Date(value.date);
    return value;
  }));

export function dateToISOString(date: Date): string {
  let isoDate = date.toISOString().split('T')[0];
  console.log(isoDate);
  return isoDate;
}

export function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6;
}

/* Note that it doesn't work on IE because the Number.EPSILON is undefined there*/
export function roundToTwo(num): number {
  return Math.round(num * 100 + Number.EPSILON)/100;
}

export function getEmployeeShortName(employee: Employee): string {
  return employee.secondName + ' '
    + employee.firstName.charAt(0) + '.' + ' '
    + employee.patronymic.charAt(0) + '.';
}
