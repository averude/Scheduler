import { ExtraWorkDay } from "../../model/extra-workday";
import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { parseDateOfEntities } from "../../shared/utils/utils";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class ExtraWorkdayService
  extends ACrudService<ExtraWorkDay> implements CUDService<ExtraWorkDay> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/extra_work_days`, http);
  }

  getAll(from?: string, to?: string): Observable<ExtraWorkDay[]> {
    return super.getAll(from, to).pipe(parseDateOfEntities);
  }
}
