import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CountDTO } from "../../model/dto/count-dto";
import { EmployeeWorkStatDTO, SummationMode } from "../../model/dto/employee-work-stat-dto";
import { AuthService } from "./auth.service";
import { UserAccountAuthority } from "../../model/dto/new-user-account-dto";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  constructor(private authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {}

  getNumberOfEmployeesInPositions(): Observable<CountDTO[]> {
    return this.http.get<CountDTO[]>(
      `${this.config.baseUrl}/statistics/positions/employees`
    );
  }

  getSummationDTO(from: string, to: string, type: SummationMode): Observable<EmployeeWorkStatDTO[]> {
    // return this.http.get<EmployeeWorkStatDTO[]>(
    //   `${this.config.baseUrl}/statistics/summation_columns/${type}/dates?from=${from}&to=${to}`
    // );

    return this.getSummationDTOByAuth(type, from, to);
  }

  getSummationDTOByAuth(type: SummationMode,
                        from: string,
                        to: string): Observable<EmployeeWorkStatDTO[]> {
    const userAccount = this.authService.currentUserAccount;

    switch (userAccount.authority) {
      case UserAccountAuthority.DEPARTMENT_ADMIN:
        return this.getSummationDTOByDepartmentId(type, userAccount.departmentId, from, to);
      case UserAccountAuthority.SHIFT_ADMIN:
        return this.getSummationDTOByShiftIds(type, userAccount.shiftIds, from, to);
      default:
        throw new Error("No required authority found");
    }
  }

  getSummationDTOByDepartmentId(type: SummationMode,
                                departmentId: number,
                                from: string,
                                to: string): Observable<EmployeeWorkStatDTO[]> {
    return this.http.get<EmployeeWorkStatDTO[]>(
      `${this.config.baseUrl}/statistics/summation_columns/${type}/departments/${departmentId}/dates?from=${from}&to=${to}`
    );
  }

  getSummationDTOByShiftIds(type: SummationMode,
                            shiftIds: number[],
                            from: string,
                            to: string): Observable<EmployeeWorkStatDTO[]> {
    return this.http.get<EmployeeWorkStatDTO[]>(
      `${this.config.baseUrl}/statistics/summation_columns/${type}/shifts/${shiftIds}/dates?from=${from}&to=${to}`
    );
  }
}
