import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { Observable } from 'rxjs';
import { DayType } from '../../model/day-type';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";
import { ACrudService } from "./abstract-service/a-crud-service";
import { HasEnterpriseIdService } from "./interface/has-enterprise-id.service";
import { toIdMap } from "../../components/calendar/utils/scheduler-utility";

@Injectable({
  providedIn: 'root'
})
export class DayTypeService
  extends ACrudService<DayType>
  implements CUDService<DayType>, HasEnterpriseIdService<DayType> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/day_types`, http);
  }

  getMapByEnterpriseId(enterpriseId: number): Observable<Map<number, DayType>> {
    return this.getAllByEnterpriseId(enterpriseId)
      .pipe(map(dayTypes => toIdMap(dayTypes)));
  }

  getAllByEnterpriseId(enterpriseId: number): Observable<DayType[]> {
    return this.http.get<DayType[]>(
      `${this.url}/enterprises/${enterpriseId}`
    ).pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }
}
