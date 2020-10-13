import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";
import { Employee } from "../../model/employee";
import { IdEntity } from "../../model/interface/id-entity";
import { BasicDto } from "../../model/dto/basic-dto";
import { ShiftComposition } from "../../model/shift-composition";
import { WorkDay } from "../../model/workday";
import { DayType } from "../../model/day-type";
import { calculateWorkHoursByWorkDay } from "./time-converter";

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

export function binarySearch<T extends IdEntity>(arr: T[], id: number): T {
  return bs(arr, 'id', id);
}

function bs(arr: any[], field, value) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid][field] === value) {
      return arr[mid];
    }
    if (value < arr[mid][field]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return undefined;
}

export function uniqById<T>(arr: T[],
                            fn: (element: T) => number): T[] {
  const seen = {};
  const out = [];
  const len = arr.length;
  let j = 0;
  for(let i = 0; i < len; i++) {
    const value = arr[i];
    const id = fn(value);
    if(seen[id] !== 1) {
      seen[id] = 1;
      out[j++] = value;
    }
  }
  return out;
}

export function sortByPattern<T1, T2>(arr: T1[],
                                      pattern: T2[],
                                      fn: (arrayElement: T1, patternElement: T2) => boolean) {
  for (let idx = 0; idx < pattern.length; idx++) {
    const patternElement = pattern[idx];

    for (let arr_idx = idx; arr_idx < arr.length; arr_idx++) {
      const arrElement = arr[arr_idx];

      if (fn(arrElement, patternElement)) {
        if (arr_idx === idx) {
          break;
        }

        const prevVal = arr[idx];
        arr[idx] = arrElement;
        arr[arr_idx] = prevVal;
        break;
      }
    }
  }
}

export function sortBy<T extends IdEntity>(dtos: BasicDto<T, any>[],
                       compositions: ShiftComposition[]) {
  const employeeMainShiftCompositions = uniqById(
    compositions
      .filter(value => !value.substitution)
      .sort((a, b) => a.shiftId - b.shiftId),
    (element => element.employeeId)
  );
  sortByPattern(dtos, employeeMainShiftCompositions,
    ((arrayElement, patternElement) => arrayElement.parent.id === patternElement.employeeId));
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
