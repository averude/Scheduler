import { Injectable } from "@angular/core";
import { ShiftComposition } from "../model/shift-composition";
import { Observable } from "rxjs";
import { RestConfig } from "../rest.config";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { APageableByDateService } from "./abstract-service/a-pageable-by-date-service";

@Injectable({
  providedIn: "root"
})
export class ShiftCompositionService
  extends APageableByDateService<ShiftComposition> implements CUDService<ShiftComposition> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAllByDepartmentIdAndDateBetween(departmentId: number,
                                     from: string,
                                     to: string): Observable<ShiftComposition[]> {
    return this.http.get<ShiftComposition[]>(
      `${this.config.baseUrl}/admin/shift_compositions/departments/${departmentId}/dates?from=${from}&to=${to}`
    );
  }

  getAllByShiftIdAndDateBetween(shiftId: number,
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
