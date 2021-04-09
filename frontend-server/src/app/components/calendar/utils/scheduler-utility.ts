import { Injectable } from "@angular/core";
import { Employee } from "../../../model/employee";
import { getEmployeeShortName } from "../../../shared/utils/utils";

@Injectable()
export class SchedulerUtility {

  getEmployeeName(employee: Employee) {
    return getEmployeeShortName(employee);
  }
}
