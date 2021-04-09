import { Injectable } from "@angular/core";
import { CUDService } from "./interface/cud-service";
import { DepartmentDayType } from "../../model/department-day-type";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { AuthService } from "./auth.service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { Observable } from "rxjs";
import { HasDepartmentIdService } from "./interface/has-department-id.service";

@Injectable({providedIn: "root"})
export class DepartmentDayTypeService
  extends ACrudService<DepartmentDayType>
  implements CUDService<DepartmentDayType>, HasDepartmentIdService<DepartmentDayType> {

  constructor(private authService: AuthService,
              http: HttpClient,
              config: RestConfig) {
    super(`${config.baseUrl}/department_day_types`, http);
  }

  getAllByDepartmentId(departmentId: number): Observable<DepartmentDayType[]> {
    return this.http.get<DepartmentDayType[]>(
      `${this.url}/departments/${departmentId}`
    );
  }
}
