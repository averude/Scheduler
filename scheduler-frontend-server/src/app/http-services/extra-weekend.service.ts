import { Injectable } from "@angular/core";
import { ExtraWeekend } from "../model/extra-weekend";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { parseDateOfEntities } from "../shared/utils/utils";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: "root"
})
export class ExtraWeekendService
  extends ACrudService<ExtraWeekend> implements CUDService<ExtraWeekend> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/extra_weekends`, http, authService);
  }

  getAllByDepartmentId(departmentId: number,
                       from: string,
                       to: string): Observable<ExtraWeekend[]> {
    return super.getAllByDepartmentId(departmentId, from, to).pipe(parseDateOfEntities);
  };

  getAllByShiftId(shiftId: number,
                  from: string,
                  to: string): Observable<ExtraWeekend[]> {
    return super.getAllByShiftId(shiftId, from, to).pipe(parseDateOfEntities);
  };
}
