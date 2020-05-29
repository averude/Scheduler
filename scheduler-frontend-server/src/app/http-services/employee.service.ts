import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { IByAuthService } from "./interface/i-by-auth.service";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService
  extends ACrudService<Employee> implements IByAuthService<Employee>, CUDService<Employee> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/employees`, http);
  }

  getByPositionId(positionId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.config.baseUrl}/admin/positions/${positionId}/employees`
    );
  }
}
