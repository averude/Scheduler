import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { Observable } from 'rxjs';
import { DayType } from '../model/day-type';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class DayTypeService extends ACrudService<DayType> implements CUDService<DayType> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/day_types`, http);
  }

  getAll(from?: string, to?: string): Observable<DayType[]> {
    return super.getAll(from, to)
      .pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }
}
