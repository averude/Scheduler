import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";
import { Employee } from "../../model/employee";
import { WorkDay } from "../../model/workday";
import { DayType } from "../../model/day-type";
import { calculateWorkHoursByWorkDay } from "./time-converter";
import { binarySearch } from "./collection-utils";

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
  if (employee && employee.secondName && employee.firstName && employee.patronymic) {
    return employee.secondName + ' '
      + employee.firstName.charAt(0) + '.' + ' '
      + employee.patronymic.charAt(0) + '.';
  }
}

export function getCellValue(workDay: WorkDay, dayTypes: DayType[]) {
  if (dayTypes && workDay.dayTypeId) {
    const dayType = binarySearch(dayTypes, workDay.dayTypeId);
    if (dayType && dayType.label) {
      return dayType.label;
    }
  }

  return calculateWorkHoursByWorkDay(workDay);
}
