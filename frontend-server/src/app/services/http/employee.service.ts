import { Injectable } from '@angular/core';
import { Employee } from '../../model/employee';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { IByAuthService } from "./interface/i-by-auth.service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { ByAuthService, ServiceAuthDecider } from "./auth-decider/service-auth-decider";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService
  extends ACrudService<Employee>
  implements IByAuthService<Employee>, CUDService<Employee>, ByAuthService<Employee> {

  constructor(private authService: AuthService,
              private decider: ServiceAuthDecider,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/employees`, http);
  }

  getAllByAuth(): Observable<Employee[]> {
    const userAccount = this.authService.currentUserAccount;
    return this.decider.getAllByAuth(this, userAccount);
  }

  getAllByDepartmentId(departmentId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.url}/departments/${departmentId}`
    );
  }

  getAllByShiftIds(shiftIds: number[]): Observable<Employee[]> {
    // return this.http.get<Employee[]>(
    //   `${this.url}/shifts/${shiftIds}`
    // );
    return of([]);
  }

}
