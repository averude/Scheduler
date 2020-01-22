import { Injectable } from "@angular/core";
import { RestConfig } from "../rest.config";
import { Observable } from "rxjs";
import { WorkingTime } from "../model/working-time";
import { HttpClient } from "@angular/common/http";
import { parseDateOfEntities } from "../shared/utils/utils";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { APageableByDateService } from "./abstract-service/a-pageable-by-date-service";

@Injectable({
  providedIn: "root"
})
export class WorkingTimeService
  extends APageableByDateService<WorkingTime> implements CUDService<WorkingTime> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAllByDepartmentIdAndDateBetween(departmentId: number,
                                     from: string,
                                     to: string): Observable<WorkingTime[]> {
    return this.http.get<WorkingTime[]>(
      `${this.config.baseUrl}/admin/working_time/departments/${departmentId}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  }

  getAllByShiftIdAndDateBetween(shiftId: number,
                                from: string,
                                to: string): Observable<WorkingTime[]> {
    return this.http.get<WorkingTime[]>(
      `${this.config.baseUrl}/admin/working_time/shifts/${shiftId}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  }

  create(workingTime: WorkingTime): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/working_time`,
      workingTime,
    );
  }

  update(workingTime: WorkingTime): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/working_time`,
      workingTime,
      {responseType: 'text'}
    );
  }

  delete(workingTimeId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/working_time/${workingTimeId}`,
      {responseType: 'text'}
    );
  }
}
