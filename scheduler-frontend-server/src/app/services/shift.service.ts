import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from '../model/shift';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";
import { ABaseService } from "./abstract-service/a-base-service";
import { CUDService } from "./interface/cud-service";

@Injectable({
  providedIn: 'root'
})
export class ShiftService
  extends ABaseService<Shift> implements CUDService<Shift> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAll(): Observable<Shift[]> {
    return this.http.get<Shift[]>(
      `${this.config.baseUrl}/admin/shifts`
    );
  }

  getAllByDepartmentId(departmentId: number): Observable<Shift[]> {
    return this.http.get<Shift[]>(
      `${this.config.baseUrl}/admin/shifts/departments/${departmentId}`
    );
  }

  getAllByShiftId(shiftId: number): Observable<Shift[]> {
    return this.getById(shiftId).pipe(map(shift => [shift]));
  }

  getById(shiftId: number): Observable<Shift> {
    return this.http.get<Shift>(
      `${this.config.baseUrl}/admin/shifts/${shiftId}`
    );
  }

  create(shift: Shift): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/shifts`,
      shift,
    );
  }

  update(shift: Shift): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/shifts`,
      shift,
      {responseType: 'text'}
    );
  }

  delete(shiftId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/shifts/${shiftId}`,
      {responseType: 'text'}
    );
  }
}
