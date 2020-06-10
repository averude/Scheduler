import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { Observable } from 'rxjs';
import { PatternUnit } from '../../model/pattern-unit';
import { CUDService } from "./interface/cud-service";

@Injectable({
  providedIn: 'root'
})
export class PatternUnitService implements CUDService<PatternUnit> {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getByPatternId(patternId: number): Observable<PatternUnit[]> {
    return this.http.get<PatternUnit[]>(
      `${this.config.baseUrl}/admin/patterns/${patternId}/units`
    );
  }

  create(patternUnit: PatternUnit): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/units`,
      patternUnit
    );
  }

  update(patternUnit: PatternUnit): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/units`,
      patternUnit,
      {responseType: 'text'}
    );
  }

  delete(patternUnitId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/units/${patternUnitId}`,
      {responseType: 'text'}
    );
  }
}
