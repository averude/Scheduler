import { Injectable } from '@angular/core';
import {Employee} from '../model/employee';
import {EMPLOYEES} from '../datasource/mock-employees';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[] = EMPLOYEES;

  constructor() { }

  getEmployees(departmentId: number): Observable<Employee[]> {
    return of(this.employees).pipe(delay(500));
  }

  addEmployee(employee: Employee): Observable<number> {
    employee.id = this.employees
      .map(value => value.id)
      .reduce((a, b) => Math.max(a, b)) + 1;
    this.employees.push(employee);
    return of(employee.id);
  }

  updateEmployee(employee: Employee) {
    //
  }

  deleteEmployee(employee: Employee) {
    this.employees.splice(this.findIndex(employee), 1);
  }

  private findIndex(employee: Employee): number {
    return this.employees.indexOf(employee);
  }
}
