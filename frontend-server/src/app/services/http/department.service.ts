import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../../model/department';
import { Observable } from 'rxjs';
import { RestConfig } from '../../rest.config';
import { IByAuthService } from "./interface/i-by-auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService
  extends ACrudService<Department>
  implements IByAuthService<Department>, CUDService<Department> {

  constructor(http: HttpClient,
              config: RestConfig) {
    super(`${config.baseUrl}/admin/departments`, http);
  }

  getCurrent(): Observable<Department> {
    return this.http.get<Department>(
      `${this.url}/current`
    );
  }
}
