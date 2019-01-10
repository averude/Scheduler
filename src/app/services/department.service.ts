import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../model/department';
import { Observable } from 'rxjs';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(
      `${this.config.baseUrl}/departments/${id}`,
      this.config.options);
  }
}
