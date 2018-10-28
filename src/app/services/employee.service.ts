import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getByDepartmentId(departmentId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.config.baseUrl}/${departmentId}/employees`,
      this.config.options);
  }

  getByPositionId(departmentId: number,
                  positionId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.config.baseUrl}/${departmentId}/positions/${positionId}/employees`,
      this.config.options);
  }

  getById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.config.baseUrl}/employees/${employeeId}`,
      this.config.options);
  }

  create(departmentId: number,
         positionId: number,
         employee: Employee): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/${departmentId}/positions/${positionId}/employees`,
      employee,
      this.config.options);
  }

  update(departmentId: number,
         positionId: number,
         employeeId: number,
         employee: Employee): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/${departmentId}/positions/${positionId}/employees/${employeeId}`,
      employee,
      this.config.options);
  }

  remove(departmentId: number,
         positionId: number,
         employeeId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/${departmentId}/positions/${positionId}/employees/${employeeId}`,
      this.config.options);
  }
}
