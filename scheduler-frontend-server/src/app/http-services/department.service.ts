import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../model/department';
import { Observable } from 'rxjs';
import { RestConfig } from '../rest.config';
import { IByAuthService } from "./interface/i-by-auth.service";
import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements IByAuthService<Department>, CUDService<Department> {
  private readonly url: string;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    this.url = `${config.baseUrl}/admin/departments`;
  }

  getAllByAuth(): Observable<Department[]> {
    return this.getAll();
  }

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(
      `${this.config.baseUrl}/admin/departments`
    );
  }

  getCurrent(): Observable<Department> {
    return this.http.get<Department>(
      `${this.config.baseUrl}/admin/departments/current`
    );
  }

  getById(departmentId: number): Observable<Department> {
    return this.http.get<Department>(
      `${this.config.baseUrl}/admin/departments/${departmentId}`,
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
