import { Injectable } from '@angular/core';
import { Employee } from '../../model/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { HasDepartmentIdService } from "./interface/has-department-id.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService
  extends ACrudService<Employee>
  implements CUDService<Employee>, HasDepartmentIdService<Employee> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/employees`, http);
  }


  getAllByDepartmentId(departmentId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.url}/departments/${departmentId}`
    );
  }

}
