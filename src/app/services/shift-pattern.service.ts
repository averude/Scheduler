import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShiftPattern } from '../model/shift-pattern';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { CrudService } from "./interface/crud.service";

@Injectable({
  providedIn: 'root'
})
export class ShiftPatternService implements CrudService<ShiftPattern> {

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

  delete(patternId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/patterns/${patternId}`,
      {responseType: 'text'}
    );
  }
}
