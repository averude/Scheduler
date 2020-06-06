import { Injectable } from "@angular/core";
import { RestConfig } from "../rest.config";
import { Observable } from "rxjs";
import { WorkingTime } from "../model/working-time";
import { HttpClient } from "@angular/common/http";
import { parseDateOfEntities } from "../shared/utils/utils";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: "root"
})
export class WorkingTimeService
  extends ACrudService<WorkingTime> implements CUDService<WorkingTime> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/working_time`, http);
  }

  getAll(from?: string, to?: string): Observable<WorkingTime[]> {
    return super.getAll(from, to).pipe(parseDateOfEntities);
  }
}
