import { Injectable } from '@angular/core';
import { Shift } from '../../model/shift';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ByAuthService, ServiceAuthDecider } from "./auth-decider/service-auth-decider";

@Injectable({
  providedIn: 'root'
})
export class ShiftService
  extends ACrudService<Shift>
  implements CUDService<Shift>, ByAuthService<Shift> {

  constructor(private authService: AuthService,
              private decider: ServiceAuthDecider,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/shifts`, http);
  }

  getAllByAuth(): Observable<Shift[]> {
    const account = this.authService.currentUserAccount;
    return this.decider.getAllByAuth(this, account);
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
      `${this.url}/shifts/${shiftIds}`
    ).pipe(
      map(value => value.sort((a, b) => a.id - b.id))
    );
  }

  getAll(from?: string, to?: string): Observable<Shift[]> {
    return super.getAll(from, to)
      .pipe(
        map(value => value.sort((a, b) => a.id - b.id))
      );
  }
}
