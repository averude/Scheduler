import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = 'http://localhost:8080/scheduler/api/v1/departments';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = {headers: this.headers};

  constructor(private http: HttpClient) { }

  getByDepartmentId(departmentId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.baseUrl}/${departmentId}/employees`,
      this.options);
  }

  getByPositionId(departmentId: number,
                  positionId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.baseUrl}/${departmentId}/positions/${positionId}/employees`,
      this.options);
  }

  create(departmentId: number,
         positionId: number,
         employee: Employee): Observable<any> {
    return this.http.post<number>(
      `${this.baseUrl}/${departmentId}/positions/${positionId}/employees`,
      employee,
      this.options);
  }

  update(departmentId: number,
         positionId: number,
         employeeId: number,
         employee: Employee): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${departmentId}/positions/${positionId}/employees/${employeeId}`,
      employee,
      this.options);
  }

  remove(departmentId: number,
         positionId: number,
         employeeId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${departmentId}/positions/${positionId}/employees/${employeeId}`,
      this.options);
  }
}
