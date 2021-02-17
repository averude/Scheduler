import { Injectable } from "@angular/core";
import { CUDService } from "./interface/cud-service";
import { DepartmentDayType } from "../../model/department-day-type";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { AuthService } from "./auth.service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class DepartmentDayTypeService
  extends ACrudService<DepartmentDayType> implements CUDService<DepartmentDayType> {

  constructor(private authService: AuthService,
              http: HttpClient,
              config: RestConfig) {
    super(`${config.baseUrl}/admin/department_day_types`, http);
  }

  getAll(from?: string, to?: string): Observable<DepartmentDayType[]> {
    return this.getAllByAuth();
  }

  getAllByAuth(): Observable<DepartmentDayType[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.departmentId) {
      return this.getAllByDepartmentId(userAccount.departmentId);
    }
  }

  getAllByDepartmentId(departmentId: number): Observable<DepartmentDayType[]> {
    return this.http.get<DepartmentDayType[]>(
      `${this.url}/departments/${departmentId}`
    );
  }
}
