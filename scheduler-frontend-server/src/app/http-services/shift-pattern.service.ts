import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShiftPattern } from '../model/shift-pattern';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { AuthService } from "./auth.service";
import { ABaseService } from "./abstract-service/a-base-service";
import { CUDService } from "./interface/cud-service";

@Injectable({
  providedIn: 'root'
})
export class ShiftPatternService
  extends ABaseService<ShiftPattern> implements CUDService<ShiftPattern> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAll(): Observable<ShiftPattern[]> {
    return this.http.get<ShiftPattern[]>(
      `${this.config.baseUrl}/admin/patterns`
    );
  }

  getAllByDepartmentId(departmentId: number): Observable<ShiftPattern[]> {
    return this.http.get<ShiftPattern[]>(
      `${this.config.baseUrl}/admin/patterns/departments/${departmentId}`
    );
  }

  getAllByShiftId(shiftId: number): Observable<ShiftPattern[]> {
    return this.http.get<ShiftPattern[]>(
      `${this.config.baseUrl}/admin/patterns/shifts/${shiftId}`
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
