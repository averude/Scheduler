import { APageableByDateService } from "./abstract-service/a-pageable-by-date-service";
import { ExtraWorkDay } from "../model/extra-workday";
import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ExtraWeekend } from "../model/extra-weekend";
import { parseDateOfEntities } from "../shared/utils/utils";

@Injectable({
  providedIn: 'root'
})
export class ExtraWorkdayService
  extends APageableByDateService<ExtraWorkDay> implements CUDService<ExtraWorkDay> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAllByDepartmentIdAndDateBetween(departmentId: number,
                                     from: string,
                                     to: string): Observable<ExtraWorkDay[]> {
    return this.http.get<ExtraWeekend[]>(
      `${this.config.baseUrl}/admin/extra_work_days/departments/${departmentId}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  };

  getAllByShiftIdAndDateBetween(shiftId: number,
                                from: string,
                                to: string): Observable<ExtraWorkDay[]> {
    return this.http.get<ExtraWeekend[]>(
      `${this.config.baseUrl}/admin/extra_work_days/shifts/${shiftId}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  };

  create(extraWeekend: ExtraWorkDay): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/extra_work_days`,
      extraWeekend,
    );
  }

  update(extraWeekend: ExtraWorkDay): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/extra_work_days`,
      extraWeekend,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/extra_work_days/${id}`,
      {responseType: 'text'}
    );
  }
}
