import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from '../model/shift';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getByDepartmentId(departmentId: number): Observable<Shift[]> {
    return this.http.get<Shift[]>(
      `${this.config.baseUrl}/departments/${departmentId}/shifts`,
      this.config.options
    );
  }

  create(departmentId: number,
         shift: Shift): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/departments/${departmentId}/shifts`,
      shift,
      this.config.options
    );
  }

  update(departmentId: number,
         shiftId: number,
         shift: Shift): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/departments/${departmentId}/shifts/${shiftId}`,
      shift,
      this.config.options
    );
  }

  remove(departmentId: number,
         shiftId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/departments/${departmentId}/shifts/${shiftId}`,
      this.config.options
    );
  }
}
