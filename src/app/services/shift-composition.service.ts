import { Injectable } from "@angular/core";
import { ShiftComposition } from "../model/shift-composition";
import { Observable } from "rxjs";
import { RestConfig } from "../rest.config";
import { HttpClient } from "@angular/common/http";
import { PageableByDateCrudService } from "./interface/pageable-by-date-crud.service";
import { AuthService } from "./auth.service";

@Injectable({providedIn: "root"})
export class ShiftCompositionService implements PageableByDateCrudService<ShiftComposition> {
  constructor(private http: HttpClient,
              private authService: AuthService,
              private config: RestConfig) {}

  getAll(): Observable<ShiftComposition[]> {
    return this.http.get<ShiftComposition[]>(
      `${this.config.baseUrl}/admin/shift_compositions`
    );
  }

  getAllByDate(from: string, to: string): Observable<ShiftComposition[]> {
    let departmentId = this.authService.currentUserValue.departmentId;
    return this.getAllByDepartmentIdAndDate(departmentId, from, to);
  }

  getAllByDepartmentIdAndDate(departmentId: number,
                              from: string,
                              to: string): Observable<ShiftComposition[]> {
    return this.http.get<ShiftComposition[]>(
      `${this.config.baseUrl}/admin/shift_compositions/departments/${departmentId}/dates?from=${from}&to=${to}`
    );
  }

  getAllByShiftIdAndDate(shiftId: number,
                              from: string,
                              to: string): Observable<ShiftComposition[]> {
    return this.http.get<ShiftComposition[]>(
      `${this.config.baseUrl}/admin/shift_compositions/shifts/${shiftId}/dates?from=${from}&to=${to}`
    );
  }

  create(shiftSchedule: ShiftComposition): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/shift_compositions`,
      shiftSchedule,
    );
    // console.log(shiftSchedule);
    // SS.push(shiftSchedule);
    // return of(null);
  }

  update(shiftSchedule: ShiftComposition): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/shift_compositions`,
      shiftSchedule,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/shift_compositions/${id}`,
      {responseType: 'text'}
    );
  }
}
