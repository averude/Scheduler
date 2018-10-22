import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from '../model/department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl = 'http://localhost:8080/scheduler/api/v1/departments';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = {headers: this.headers};

  constructor(private http: HttpClient) { }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.baseUrl}/${id}`, this.options);
  }
}
