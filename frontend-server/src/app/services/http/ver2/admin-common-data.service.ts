import { forkJoin, Observable, of } from "rxjs";
import { AdminCommonDataDTO } from "../../../model/dto/general/admin-common-data-dto";
import { RatioColumnService } from "../ratio-column.service";
import { ShiftPatternDtoService } from "../shift-pattern-dto.service";
import { DepartmentDayTypeService } from "../department-day-type.service";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

export const DEPARTMENTS: number[] = [11, 16, 17, 18, 19, 20];

@Injectable({
  providedIn: 'root'
})
export class AdminCommonDataService {

  constructor(private ratioColumnService: RatioColumnService,
              private shiftPatternDtoService: ShiftPatternDtoService,
              private departmentDayTypeService: DepartmentDayTypeService) {}

  // TODO: exchange with backend endpoint
  getByEnterpriseAndDepartmentId(enterpriseId: number,
                                 departmentId: number): Observable<AdminCommonDataDTO> {
    const obs: Observable<any>[] = [
      // Temporary
      DEPARTMENTS
        .indexOf(departmentId) >= 0 ? this.ratioColumnService.getAllByEnterpriseId(enterpriseId) : of([]),
      //
      this.shiftPatternDtoService.getAllByDepartmentId(departmentId),
      this.departmentDayTypeService.getAllByDepartmentId(departmentId)
    ];

    return forkJoin(obs).pipe(
      map(([ratioColumns, patternDTOs, departmentDayTypes]) => ({
        ratioColumns: ratioColumns,
        patternDTOs: patternDTOs,
        departmentDayTypes: departmentDayTypes
      }))
    )
  }
}
