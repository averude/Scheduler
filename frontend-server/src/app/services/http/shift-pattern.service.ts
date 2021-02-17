import { Injectable } from '@angular/core';
import { ShiftPattern } from '../../model/shift-pattern';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShiftPatternService
  extends ACrudService<ShiftPattern> implements CUDService<ShiftPattern> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/patterns`, http);
  }

  getAll(from?: string, to?: string): Observable<ShiftPattern[]> {
    return this.getAllByAuth();
  }

  getAllByAuth(): Observable<ShiftPattern[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.departmentId) {
      return this.getAllByDepartmentId(userAccount.departmentId);
    }
  }

  getAllByDepartmentId(departmentId: number): Observable<ShiftPattern[]> {
    return this.http.get<ShiftPattern[]>(
      `${this.url}/departments/${departmentId}`
    );
  }
}
