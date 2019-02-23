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

  getAll(): Observable<ShiftPattern[]> {
    return this.http.get<ShiftPattern[]>(
      `${this.config.baseUrl}/admin/patterns`
    );
  }

  create(pattern: ShiftPattern): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/patterns`,
      pattern
    );
  }

  update(pattern: ShiftPattern): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/patterns`,
      pattern,
      {responseType: 'text'}
    );
  }

  remove(patternId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/patterns/${patternId}`,
      {responseType: 'text'}
    );
  }
}
