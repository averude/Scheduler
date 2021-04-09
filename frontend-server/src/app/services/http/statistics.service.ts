import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EmployeeWorkStatDTO, SummationMode } from "../../model/dto/employee-work-stat-dto";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getSummationDTOByDepartmentId(type: SummationMode,
                                departmentId: number,
                                from: string,
                                to: string): Observable<EmployeeWorkStatDTO[]> {
    return this.http.get<EmployeeWorkStatDTO[]>(
      `${this.config.baseUrl}/statistics/work_stats/mode/${type}/departments/${departmentId}?from=${from}&to=${to}`
    );
  }

  getSummationDTOByShiftIds(type: SummationMode,
                            shiftIds: number[],
                            from: string,
                            to: string): Observable<EmployeeWorkStatDTO[]> {
    return this.http.get<EmployeeWorkStatDTO[]>(
      `${this.config.baseUrl}/statistics/work_stats/mode/${type}/shifts/${shiftIds}?from=${from}&to=${to}`
    );
  }
}
