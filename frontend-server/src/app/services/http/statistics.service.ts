import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CountDTO } from "../../model/dto/count-dto";
import { EmployeeWorkStatDTO, SummationMode } from "../../model/dto/employee-work-stat-dto";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getNumberOfEmployeesInPositions(): Observable<CountDTO[]> {
    return this.http.get<CountDTO[]>(
      `${this.config.baseUrl}/statistics/positions/employees`
    );
  }

  getSummationDTO(from: string, to: string, type: SummationMode): Observable<EmployeeWorkStatDTO[]> {
    return this.http.get<EmployeeWorkStatDTO[]>(
      `${this.config.baseUrl}/statistics/summation_columns/${type}/dates?from=${from}&to=${to}`
    );
  }
}
