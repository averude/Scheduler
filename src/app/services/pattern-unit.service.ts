import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { Observable } from 'rxjs';
import { PatternUnit } from '../model/patternunit';

@Injectable({
  providedIn: 'root'
})
export class PatternUnitService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getInPattern(departmentId: number,
               patternId: number): Observable<PatternUnit[]> {
    return this.http.get<PatternUnit[]>(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${patternId}/tokens`,
      this.config.options
    );
  }

  create(departmentId: number,
         patternId: number,
         patternUnit: PatternUnit): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${patternId}/tokens`,
      patternUnit,
      this.config.options
    );
  }

  update(departmentId: number,
         patternId: number,
         patternUnit: PatternUnit): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${patternId}/tokens/${patternUnit.id}`,
      patternUnit,
      this.config.options
    );
  }

  remove(departmentId: number,
         patternId: number,
         patternUnitId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${patternId}/tokens/${patternUnitId}`,
      this.config.options
    );
  }
}
