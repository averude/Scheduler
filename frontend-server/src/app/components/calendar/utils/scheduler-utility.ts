import { Injectable } from "@angular/core";
import { Employee } from "../../../model/employee";
import { getEmployeeShortName } from "../../../shared/utils/utils";
import { IdEntity } from "../../../model/interface/id-entity";

@Injectable()
export class SchedulerUtility {

  getEmployeeName(employee: Employee) {
    return getEmployeeShortName(employee);
  }
}

export function toIdMap<T extends IdEntity>(list: T[]):Map<number, T> {
  let result = new Map<number, T>();
  list.forEach(value => result.set(value.id, value));
  return result;
}
