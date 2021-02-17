import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { Observable } from 'rxjs';
import { DayType } from '../../model/day-type';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class DayTypeService
  extends ACrudService<DayType>
  implements CUDService<DayType> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/day_types`, http);
  }

  getAll(from?: string, to?: string): Observable<DayType[]> {
    return this.getAllByAuth();
  }

  getAllByAuth(): Observable<DayType[]> {
    const userAccount = this.authService.currentUserAccount;

    return this.getAllByEnterpriseId(userAccount.enterpriseId)
      .pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }

  getAllByEnterpriseId(enterpriseId: number): Observable<DayType[]> {
    return this.http.get<DayType[]>(
      `${this.url}/enterprises/${enterpriseId}`
    );
  }

}
