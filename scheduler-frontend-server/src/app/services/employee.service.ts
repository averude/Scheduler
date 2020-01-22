import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { APageableByDateService } from "./abstract-service/a-pageable-by-date-service";
import { IByAuthService } from "./interface/i-by-auth.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService
  extends APageableByDateService<Employee> implements IByAuthService<Employee>, CUDService<Employee> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.config.baseUrl}/admin/employees`
    );
  }

  getAllByAuth(from?: string, to?: string): Observable<Employee[]> {
    return this.getAllByAuthAndDateBetween(from, to);
  }

  getAllByDepartmentIdAndDateBetween(departmentId: number,
                                     from?: string,
                                     to?: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.config.baseUrl}/admin/employees/departments/${departmentId}`
    );
  }

  getAllByShiftIdAndDateBetween(shiftId: number,
                                from: string,
                                to: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.config.baseUrl}/admin/employees/shifts/${shiftId}/dates?from=${from}&to=${to}`
    );
  }

  getByPositionId(positionId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.config.baseUrl}/admin/positions/${positionId}/employees`
    );
  }

  getById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.config.baseUrl}/admin/employees/${employeeId}`
    );
  }

  create(employee: Employee): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/employees`,
      employee
    );
  }

  update(employee: Employee): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/employees`,
      employee,
      {responseType: 'text'}
    );
  }

  delete(employeeId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/employees/${employeeId}`,
      {responseType: 'text'}
    );
  }
}
