import { Injectable } from "@angular/core";
import { RestConfig } from "../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Holiday } from "../model/holiday";
import { parseDateOfEntities } from "../shared/utils/utils";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { APageableByDateService } from "./abstract-service/a-pageable-by-date-service";

@Injectable({
  providedIn: "root"
})
export class HolidayService
  extends APageableByDateService<Holiday> implements CUDService<Holiday> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAllByDepartmentIdAndDateBetween(departmentId: number,
                                     from: string,
                                     to: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(
      `${this.config.baseUrl}/admin/holidays/departments/${departmentId}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  };

  getAllByShiftIdAndDateBetween(shiftId: number,
                                from: string,
                                to: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(
      `${this.config.baseUrl}/admin/holidays/shifts/${shiftId}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  };

  create(holiday: Holiday): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/holidays`,
      holiday,
    );
  }

  update(holiday: Holiday): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/holidays`,
      holiday,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/holidays/${id}`,
      {responseType: 'text'}
    );
  }
}
