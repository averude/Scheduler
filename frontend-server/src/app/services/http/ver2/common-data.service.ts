import { forkJoin, Observable } from "rxjs";
import { CommonDataDTO } from "../../../model/dto/general/common-data-dto";
import { Injectable } from "@angular/core";
import { DayTypeService } from "../day-type.service";
import { PositionService } from "../position.service";
import { ShiftService } from "../shift.service";
import { EmployeeService } from "../employee.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor(private dayTypeService: DayTypeService,
              private positionService: PositionService,
              private shiftService: ShiftService,
              private employeeService: EmployeeService){
  }

  // TODO: should be exchanged with the new endpoint on the backend side
  getByEnterpriseIdAndDepartmentId(enterpriseId: number,
                                   departmentId: number): Observable<CommonDataDTO> {
    const sources: Observable<any>[] = [
      this.dayTypeService.getAllByEnterpriseId(enterpriseId),
      this.positionService.getAllByDepartmentId(departmentId),
      this.shiftService.getAllByDepartmentId(departmentId),
      this.employeeService.getAllByDepartmentId(departmentId)
    ];

    return forkJoin(sources)
      .pipe(
        map(([dayTypes, positions, shifts, employees]) => {
          return {
            dayTypes:   dayTypes,
            positions:  positions,
            shifts:     shifts,
            employees:  employees
          }
        })
      );
  }
}
