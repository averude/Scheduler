import { Injectable } from '@angular/core';
import { Shift } from '../../model/shift';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HasDepartmentIdService } from "./interface/has-department-id.service";

@Injectable({
  providedIn: 'root'
})
export class ShiftService
  extends ACrudService<Shift>
  implements CUDService<Shift>, HasDepartmentIdService<Shift> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/shifts`, http);
  }

  getAllByDepartmentId(departmentId: number): Observable<Shift[]> {
    return this.http.get<Shift[]>(
      `${this.url}/departments/${departmentId}`
    ).pipe(
      map(value => value.sort((a, b) => a.id - b.id))
    );
  }

  getAllByShiftIds(shiftIds: number[]): Observable<Shift[]> {
    return this.http.get<Shift[]>(
      `${this.url}/${shiftIds}`
    ).pipe(
      map(value => value.sort((a, b) => a.id - b.id))
    );
  }
}
