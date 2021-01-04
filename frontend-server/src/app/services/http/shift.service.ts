import { Injectable } from '@angular/core';
import { Shift } from '../../model/shift';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShiftService
  extends ACrudService<Shift> implements CUDService<Shift> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/shifts`, http);
  }

  getAll(from?: string, to?: string): Observable<Shift[]> {
    return super.getAll(from, to)
      .pipe(
        map(value => value.sort((a, b) => a.id - b.id))
      );
  }
}
