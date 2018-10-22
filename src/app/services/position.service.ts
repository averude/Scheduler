import { Injectable } from '@angular/core';
import { Position } from '../model/position';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  baseUrl = 'http://localhost:8080/scheduler/api/v1/departments';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = {headers: this.headers};

  constructor(private http: HttpClient) { }

  getByDepartmentId(departmentId: number): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.baseUrl}/${departmentId}/positions`,
      this.options);
  }

  create(departmentId: number,
         position: Position): Observable<any> {
     return this.http.post<number>(
       `${this.baseUrl}/${departmentId}/positions`,
       position,
       this.options);
  }

  update(departmentId: number,
         positionId: number,
         position: Position): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${departmentId}/positions/${positionId}`,
      position,
      this.options);
  }

  remove(departmentId: number,
         positionId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${departmentId}/positions/${positionId}`,
      this.options);
  }
}
