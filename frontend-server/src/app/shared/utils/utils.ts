import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";
import { Employee } from "../../model/employee";
import { WorkDay } from "../../model/workday";
import { DayType } from "../../model/day-type";
import { HasTime } from "../../model/interface/has-time";

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
  return isoDate;
}

export function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6;
}

export function xor(a: boolean, b: boolean): boolean {
  return ( a || b ) && !( a && b );
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

export function getEmployeeFullName(employee: Employee): string {
  if (employee && employee.secondName && employee.firstName && employee.patronymic) {
    return employee.secondName + ' '
      + employee.firstName + ' '
      + employee.patronymic;
  }
}

export function getWorkDayDayTypeId(workDay: WorkDay) {
  return workDay.actualDayTypeId ? workDay.actualDayTypeId : workDay.scheduledDayTypeId;
}

export function getCellValue(workDay: WorkDay,
                             dayTypesMap: Map<number, DayType>,
                             useReportLabel?: boolean) {
  return getCellValueExt(workDay, dayTypesMap, getWorkDayDayTypeId, useReportLabel);
}

export function compareHasTime(a: HasTime,
                               b: HasTime): boolean {
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

export function calculateHoursByHasTimeString(hasTime: HasTime): number {
  if (!hasTime) return 0;

  return calculateWorkHoursByTimeStrings(hasTime.startTime,
    hasTime.endTime,
    hasTime.breakStartTime,
    hasTime.breakEndTime);
}

export function calculateHoursByHasTime(hasTime: HasTime): number {
  if (!hasTime) return 0;
  return calculateWorkHoursByTime(hasTime.startTime, hasTime.endTime, hasTime.breakStartTime, hasTime.breakEndTime);
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

export const passwordValidationPattern: string = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$';

export function getCellValueExt(workDay: WorkDay,
                                dayTypesMap: Map<number, DayType>,
                                fn: (workday: WorkDay) => number,
                                useReportLabel?: boolean) {
  const dayTypeId = fn(workDay);
  if (dayTypesMap && dayTypeId) {
    const dayType = dayTypesMap.get(dayTypeId);

    if (useReportLabel && dayType && dayType.reportLabel) {
      return dayType.reportLabel;
    }

    if (dayType && dayType.label) {
      return dayType.label;
    }
  }

  return calculateHoursByHasTime(workDay);
}
