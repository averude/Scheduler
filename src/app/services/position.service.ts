import { Injectable } from '@angular/core';
import { Position } from '../model/position';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getByDepartmentId(departmentId: number): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.config.baseUrl}/${departmentId}/positions`,
      this.config.options);
  }

  create(departmentId: number,
         position: Position): Observable<any> {
     return this.http.post<number>(
       `${this.config.baseUrl}/${departmentId}/positions`,
       position,
       this.config.options);
  }

  update(departmentId: number,
         positionId: number,
         position: Position): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/${departmentId}/positions/${positionId}`,
      position,
      this.config.options);
  }

  remove(departmentId: number,
         positionId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/${departmentId}/positions/${positionId}`,
      this.config.options);
  }
}
