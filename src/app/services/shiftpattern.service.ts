import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShiftPattern } from '../model/shiftpattern';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class ShiftPatternService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getByDepartmentId(departmentId: number): Observable<ShiftPattern[]> {
    return this.http.get<ShiftPattern[]>(
      `${this.config.baseUrl}/departments/${departmentId}/patterns`,
      this.config.options);
  }

  create(departmentId: number,
         pattern: ShiftPattern): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/departments/${departmentId}/patterns`,
      pattern,
      this.config.options
    );
  }

  update(departmentId: number,
         pattern: ShiftPattern): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${pattern.id}`,
      pattern,
      this.config.options
    );
  }

  remove(departmentId: number,
         patternId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${patternId}`,
      this.config.options
    );
  }
}
