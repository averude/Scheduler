import { ACrudService } from "./abstract-service/a-crud-service";
import { CUDService } from "./interface/cud-service";
import { SpecialCalendarDate } from "../../model/special-calendar-date";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Observable } from "rxjs";
import { HasEnterpriseIdService } from "./interface/has-enterprise-id.service";

@Injectable({providedIn: "root"})
export class SpecialCalendarDateService
  extends ACrudService<SpecialCalendarDate>
  implements CUDService<SpecialCalendarDate>, HasEnterpriseIdService<SpecialCalendarDate>  {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/special_calendar_dates`, http);
  }

  getAllByEnterpriseId(enterpriseId: number, from: string, to: string): Observable<SpecialCalendarDate[]> {
    return this.http.get<SpecialCalendarDate[]>(
      `${this.url}/enterprises/${enterpriseId}?from=${from}&to=${to}`
    );
  }
}
