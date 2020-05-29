import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { Observable } from 'rxjs';
import { DayType } from '../model/day-type';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";
import { IByEnterpriseIdService } from "./interface/i-by-enterprise-id.service";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class DayTypeService extends ACrudService<DayType>
  implements CUDService<DayType>, IByEnterpriseIdService<DayType> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/day_types`, http);
  }

  getAllByDepartmentId(departmentId: number): Observable<DayType[]> {
    return super.getAllByDepartmentId(departmentId)
      .pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }

  getAllByShiftId(shiftId: number): Observable<DayType[]> {
    return super.getAllByShiftId(shiftId)
      .pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }
}
