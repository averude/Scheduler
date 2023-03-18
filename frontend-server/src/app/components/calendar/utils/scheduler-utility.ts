import { Injectable } from "@angular/core";
import { Employee } from "../../../model/employee";
import { getEmployeeShortName } from "../../../shared/utils/utils";
import { IdEntity } from "../../../model/interface/id-entity";
import { ScheduleCell } from "../model/table-data";
import { WorkDay } from "../../../model/workday";

@Injectable()
export class SchedulerUtility {

  getEmployeeName(employee: Employee) {
    return getEmployeeShortName(employee);
  }
}

export const CELL_TRACK_BY_FN = (index: number, item: ScheduleCell) => {
  const value = <WorkDay> item.value;
  if (value) {
    return item.enabled + ':' + value.actualDayTypeId + '-'
      + value.scheduledDayTypeId
      + '-' + value.startTime
      + '-' + value.endTime
      + '-' + value.breakStartTime
      + '-' + value.breakEndTime;
  } else {
    return item.enabled;
  }
};

export function toArray<K, V>(map: Map<K, V>): V[] {
  let result = [];
  if (!map) {
    return result;
  }

  for (let value of map.values()) {
    result.push(value);
  }

  return result;
}

export function toIdMap<T extends IdEntity>(list: T[]):Map<number, T> {
  let result = new Map<number, T>();
  list.forEach(value => result.set(value.id, value));
  return result;
}

export function toNumMap<T>(list: T[],
                            fn: (value: T) => number):Map<number, T> {
  let result = new Map<number, T>();
  list.forEach(value => result.set(fn(value), value));
  return result;
}
