import { ACrudService } from "./abstract-service/a-crud-service";
import { CUDService } from "./interface/cud-service";
import { SpecialCalendarDate } from "../../model/special-calendar-date";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";

@Injectable({providedIn: "root"})
export class SpecialCalendarDateService
  extends ACrudService<SpecialCalendarDate> implements CUDService<SpecialCalendarDate>  {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/special_calendar_dates`, http);
  }
}
