import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EmployeeWorkStatDTO, SummationMode } from "../../model/dto/employee-work-stat-dto";
import { map } from "rxjs/operators";
import { toNumMap } from "../../components/calendar/utils/scheduler-utility";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getSummationDTOMapByDepartmentId(type: SummationMode,
                                   enterpriseId: number,
                                   departmentId: number,
                                   from: string,
                                   to: string): Observable<Map<number, EmployeeWorkStatDTO>> {
    return this.http.get<EmployeeWorkStatDTO[]>(
      `${this.config.baseUrl}/enterprises/${enterpriseId}/departments/${departmentId}/statistics/work_stats/mode/${type}?from=${from}&to=${to}`
    ).pipe(map((summationDTOs: EmployeeWorkStatDTO[]) => toNumMap(summationDTOs, value => value.employeeId)));
  }

  getSummationDTOMapByShiftIds(type: SummationMode,
                               enterpriseId: number,
                               departmentId: number,
                               shiftIds: number[],
                               from: string,
                               to: string): Observable<Map<number, EmployeeWorkStatDTO>> {
    return this.http.get<EmployeeWorkStatDTO[]>(
      `${this.config.baseUrl}/enterprises/${enterpriseId}/departments/${departmentId}/shifts/${shiftIds}/statistics/work_stats/mode/${type}?from=${from}&to=${to}`
    ).pipe(map((summationDTOs: EmployeeWorkStatDTO[]) => toNumMap(summationDTOs, value => value.employeeId)));
  }
}
