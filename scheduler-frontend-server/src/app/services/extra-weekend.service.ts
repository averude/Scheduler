import { Injectable } from "@angular/core";
import { ExtraWeekend } from "../model/extra-weekend";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { parseDateOfEntities } from "../shared/utils/utils";
import { AuthService } from "./auth.service";
import { APageableByDateService } from "./abstract-service/a-pageable-by-date-service";
import { CUDService } from "./interface/cud-service";

@Injectable({
  providedIn: "root"
})
export class ExtraWeekendService
  extends APageableByDateService<ExtraWeekend> implements CUDService<ExtraWeekend> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAllByDepartmentIdAndDateBetween(departmentId: number,
                                     from: string,
                                     to: string): Observable<ExtraWeekend[]> {
    return this.http.get<ExtraWeekend[]>(
      `${this.config.baseUrl}/admin/extra_weekends/departments/${departmentId}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  };

  getAllByShiftIdAndDateBetween(shiftId: number,
                                from: string,
                                to: string): Observable<ExtraWeekend[]> {
    return this.http.get<ExtraWeekend[]>(
      `${this.config.baseUrl}/admin/extra_weekends/shifts/${shiftId}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  };

  create(extraWeekend: ExtraWeekend): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/extra_weekends`,
      extraWeekend,
    );
  }

  update(extraWeekend: ExtraWeekend): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/extra_weekends`,
      extraWeekend,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/extra_weekends/${id}`,
      {responseType: 'text'}
    );
  }
}
