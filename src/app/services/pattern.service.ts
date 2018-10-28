import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pattern } from '../model/pattern';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getByDepartmentId(departmentId: number): Observable<Pattern[]> {
    return this.http.get<Pattern[]>(
      `${this.config.baseUrl}/${departmentId}/patterns`,
      this.config.options);
  }

  create(departmentId: number,
         pattern: Pattern): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/${departmentId}/patterns`,
      pattern,
      this.config.options
    );
  }

  update(departmentId: number,
         patternId: number,
         pattern: Pattern): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/${departmentId}/patterns/${patternId}`,
      pattern,
      this.config.options
    );
  }

  remove(departmentId: number,
         patternId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/${departmentId}/patterns/${patternId}`,
      this.config.options
    );
  }
}
