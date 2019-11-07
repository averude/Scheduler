import { Injectable } from "@angular/core";
import { getShiftScheduleByDates, ShiftSchedule, SS } from "../model/shift-schedule";
import { Observable, of } from "rxjs";
import { RestConfig } from "../rest.config";
import { HttpClient } from "@angular/common/http";
import { PageableByDateCrudService } from "./interface/pageable-by-date-crud.service";

@Injectable({providedIn: "root"})
export class ShiftScheduleService implements PageableByDateCrudService<ShiftSchedule> {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getAll(): Observable<ShiftSchedule[]> {
    return this.http.get<ShiftSchedule[]>(
      `${this.config.baseUrl}/admin/shifts/schedule`
    );
  }

  getAllByDate(from: string, to: string): Observable<ShiftSchedule[]> {
    // return this.http.get<ShiftSchedule[]>(
    //   `${this.config.baseUrl}/admin/shifts/schedule/search?from=${from}&to=${to}`
    // );
    return of(getShiftScheduleByDates(from, to));
  }

  create(shiftSchedule: ShiftSchedule): Observable<any> {
    // return this.http.post<number>(
    //   `${this.config.baseUrl}/admin/shifts/schedule`,
    //   shiftSchedule,
    // );
    console.log(shiftSchedule);
    SS.push(shiftSchedule);
    return of(null);
  }

  update(shiftSchedule: ShiftSchedule): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/shifts/schedule`,
      shiftSchedule,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/shifts/schedule/${id}`,
      {responseType: 'text'}
    );
  }
}
