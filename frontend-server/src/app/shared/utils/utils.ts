import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";
import { Employee } from "../../model/employee";
import { WorkDay } from "../../model/workday";
import { DayType } from "../../model/day-type";
import { binarySearch } from "./collection-utils";
import { HasDayTypeIdAndTime } from "../../model/interface/has-day-type-id-and-time";

export const MONTH_YEAR_DATE_FORMAT = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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

export function getWorkDayDayTypeId(workDay: WorkDay) {
  return workDay.actualDayTypeId ? workDay.actualDayTypeId : workDay.scheduledDayTypeId;
}

export function getCellValue(workDay: WorkDay, dayTypes: DayType[]) {
  return getCellValueExt(workDay, dayTypes, getWorkDayDayTypeId);
}

export function compareHasTime(a: HasDayTypeIdAndTime,
                               b: HasDayTypeIdAndTime): boolean {
  return a.startTime === b.startTime
    && a.endTime === b.endTime
    && a.breakStartTime === b.breakStartTime
    && a.breakEndTime === b.breakEndTime;
}

export function convertTimeStringToMin(time: string): number {
  if (time) {
    let timeParts = time.split(':');
    let hh = Number.parseInt(timeParts[0]);
    let mm = Number.parseInt(timeParts[1]);

    if (hh >= 0 && hh <= 24 && mm >= 0 && mm <= 59) {
      return hh * 60 + mm;
    } else {
      return 0;
    }
  } else {
    return null;
  }
}

export function calculateWorkHoursByTimeStrings(startTime: string,
                                                endTime: string,
                                                breakStartTime: string,
                                                breakEndTime: string): number {
  if (startTime && endTime) {
    let start = convertTimeStringToMin(startTime);
    let end = convertTimeStringToMin(endTime);
    let brk_s = convertTimeStringToMin(breakStartTime);
    let brk_e = convertTimeStringToMin(breakEndTime);

    return roundToTwo((end - start - (brk_e - brk_s)) / 60);
  } else {
    return 0;
  }
}

export function calculateHoursByHasTimeString(hasDayTypeIdAndTime: HasDayTypeIdAndTime): number {
  if (!hasDayTypeIdAndTime) return 0;

  return calculateWorkHoursByTimeStrings(hasDayTypeIdAndTime.startTime,
    hasDayTypeIdAndTime.endTime,
    hasDayTypeIdAndTime.breakStartTime,
    hasDayTypeIdAndTime.breakEndTime);
}

export function calculateHoursByHasTime(hasDayTypeIdAndTime: HasDayTypeIdAndTime): number {
  if (!hasDayTypeIdAndTime) return 0;
  return calculateWorkHoursByTime(hasDayTypeIdAndTime.startTime, hasDayTypeIdAndTime.endTime, hasDayTypeIdAndTime.breakStartTime, hasDayTypeIdAndTime.breakEndTime);
}

export function calculateWorkHoursByTime(startTime: number,
                                         endTime: number,
                                         breakStartTime: number,
                                         breakEndTime: number): number {
  if (startTime >= 0 && endTime > startTime) {
    return roundToTwo((endTime - startTime - (breakStartTime && breakEndTime ? (breakEndTime - breakStartTime) : 0)) / 60);
  } else {
    return 0;
  }
}

export const timeValidationPattern: string = '^([01]?\\d|2[0-3]|24(?=:00?$)):([0-5]\\d)$';

export function getCellValueExt(workDay: WorkDay,
                                dayTypes: DayType[],
                                fn: (workday: WorkDay) => number) {
  const dayTypeId = fn(workDay);
  if (dayTypes && dayTypeId) {
    const dayType = binarySearch(dayTypes, dayTypeId);
    if (dayType && dayType.label) {
      return dayType.label;
    }
  }

  return calculateHoursByHasTime(workDay);
}
