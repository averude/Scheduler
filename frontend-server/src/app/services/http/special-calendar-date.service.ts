import { ACrudService } from "./abstract-service/a-crud-service";
import { CUDService } from "./interface/cud-service";
import { SpecialCalendarDate } from "../../model/special-calendar-date";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class SpecialCalendarDateService
  extends ACrudService<SpecialCalendarDate> implements CUDService<SpecialCalendarDate>  {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/special_calendar_dates`, http);
  }

  getAll(from?: string, to?: string): Observable<SpecialCalendarDate[]> {
    return this.getAllByAuth(from, to);
  }

  getAllByAuth(from: string, to: string): Observable<SpecialCalendarDate[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.enterpriseId) {
      return this.getAllByEnterpriseId(userAccount.enterpriseId, from, to);
    }
  }

  getAllByEnterpriseId(enterpriseId: number, from: string, to: string): Observable<SpecialCalendarDate[]> {
    return this.http.get<SpecialCalendarDate[]>(
      `${this.url}/enterprises/${enterpriseId}/dates?from=${from}&to=${to}`
    );
  }
}
