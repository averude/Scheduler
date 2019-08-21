import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../model/department';
import { Observable } from 'rxjs';
import { RestConfig } from '../rest.config';
import { CrudService } from "./interface/crud.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements CrudService<Department> {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(
      `${this.config.baseUrl}/admin/departments`
    );
  }

  getCurrent(): Observable<Department> {
    return this.http.get<Department>(
      `${this.config.baseUrl}/admin/departments/current`,
    );
  }

  create(department: Department): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/departments`,
      department
    );
  }

  update(department: Department): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/departments`,
      department,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/departments/${id}`,
      {responseType: 'text'}
    );
  }
}
