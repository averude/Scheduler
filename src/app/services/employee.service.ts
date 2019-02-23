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

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.config.baseUrl}/admin/employees`
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

  remove(employeeId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/employees/${employeeId}`,
      {responseType: 'text'}
    );
  }
}
