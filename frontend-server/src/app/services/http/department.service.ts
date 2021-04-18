import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../../model/department';
import { Observable } from 'rxjs';
import { RestConfig } from '../../rest.config';
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService
  extends ACrudService<Department>
  implements CUDService<Department> {

  constructor(private authService: AuthService,
              http: HttpClient,
              config: RestConfig) {
    super(`${config.baseUrl}/departments`, http);
  }

  getAllByEnterpriseId(enterpriseId: number): Observable<Department[]> {
    return this.http.get<Department[]>(
      `${this.url}/enterprises/${enterpriseId}`
    );
  }

  getByIds(departmentIds: number[]) {
    return this.http.get<Department[]>(
      `${this.url}/${departmentIds}`
    );
  }
}
