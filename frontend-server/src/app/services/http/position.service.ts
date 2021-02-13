import { Injectable } from '@angular/core';
import { Position } from '../../model/position';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";
import { ACrudService } from "./abstract-service/a-crud-service";
import { ByAuthService, ServiceAuthDecider } from "./auth-decider/service-auth-decider";

@Injectable({
  providedIn: 'root'
})
export class PositionService
  extends ACrudService<Position>
  implements CUDService<Position>, ByAuthService<Position> {

  constructor(private authService: AuthService,
              private decider: ServiceAuthDecider,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/positions`, http);
  }

  getAll(): Observable<Position[]> {
    return super.getAll().pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }

  getAllByAuth(): Observable<Position[]> {
    const userAccount = this.authService.currentUserAccount;
    return this.decider.getAllByAuth(this, userAccount);
  }

  getAllByDepartmentId(departmentId: number): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.url}/departments/${departmentId}`
    ).pipe(
      map(value => value.sort((a, b) => a.id - b.id))
    );
  }

  getAllByShiftIds(shiftIds: number[]): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.url}/shifts/${shiftIds}`
    ).pipe(
      map(value => value.sort((a, b) => a.id - b.id))
    );
  }
}
