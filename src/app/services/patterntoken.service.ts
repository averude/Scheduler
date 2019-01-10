import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { Observable } from 'rxjs';
import { PatternToken } from '../model/patterntoken';

@Injectable({
  providedIn: 'root'
})
export class PatternTokenService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getInPattern(departmentId: number,
               patternId: number): Observable<PatternToken[]> {
    return this.http.get<PatternToken[]>(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${patternId}/tokens`,
      this.config.options
    );
  }

  create(departmentId: number,
         patternId: number,
         patternToken: PatternToken): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${patternId}/tokens`,
      patternToken,
      this.config.options
    );
  }

  update(departmentId: number,
         patternId: number,
         patternTokenId: number,
         patternToken: PatternToken): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${patternId}/tokens/${patternTokenId}`,
      patternToken,
      this.config.options
    );
  }

  remove(departmentId: number,
         patternId: number,
         patternTokenId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/departments/${departmentId}/patterns/${patternId}/tokens/${patternTokenId}`,
      this.config.options
    );
  }
}
