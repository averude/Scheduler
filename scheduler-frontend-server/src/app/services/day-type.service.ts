import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { Observable } from 'rxjs';
import { DayType } from '../model/day-type';
import { AuthService } from "./auth.service";
import { ABaseService } from "./abstract-service/a-base-service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DayTypeService extends ABaseService<DayType> implements CUDService<DayType> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAll(): Observable<DayType[]> {
    return this.http.get<DayType[]>(
      `${this.config.baseUrl}/admin/day_types`
    );
  }

  getAllByDepartmentId(departmentId: number): Observable<DayType[]> {
    return this.http.get<DayType[]>(
      `${this.config.baseUrl}/admin/day_types/departments/${departmentId}`
    ).pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }

  getAllByShiftId(shiftId: number): Observable<DayType[]> {
    return this.http.get<DayType[]>(
      `${this.config.baseUrl}/admin/day_types/shifts/${shiftId}`
    ).pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }

  getById(dayTypeId: number): Observable<DayType> {
    return this.http.get<DayType>(
      `${this.config.baseUrl}/admin/day_types/${dayTypeId}`
    );
  }

  create(dayType: DayType): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/day_types`,
      dayType,
    );
  }

  update(dayType: DayType): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/day_types/`,
      dayType,
      {responseType: 'text'}
    );
  }

  delete(dayTypeId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/day_types/${dayTypeId}`,
      {responseType: 'text'}
    );
  }
}
