import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Holiday } from "../../model/holiday";
import { parseDateOfEntities } from "../../shared/utils/utils";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: "root"
})
export class HolidayService
  extends ACrudService<Holiday> implements CUDService<Holiday> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/holidays`, http);
  }

  getAll(from?: string, to?: string): Observable<Holiday[]> {
    return super.getAll(from, to).pipe(parseDateOfEntities);
  }
}
