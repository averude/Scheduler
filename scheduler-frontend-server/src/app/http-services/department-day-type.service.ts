import { Injectable } from "@angular/core";
import { CUDService } from "./interface/cud-service";
import { DepartmentDayType } from "../model/department-day-type";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { AuthService } from "./auth.service";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({providedIn: "root"})
export class DepartmentDayTypeService
  extends ACrudService<DepartmentDayType> implements CUDService<DepartmentDayType> {

  constructor(authService: AuthService,
              http: HttpClient,
              config: RestConfig) {
    super(`${config.baseUrl}/admin/department_day_types`, http);
  }
}
