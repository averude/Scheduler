import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../../model/department';
import { Observable } from 'rxjs';
import { RestConfig } from '../../rest.config';
import { IByAuthService } from "./interface/i-by-auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { AuthService } from "./auth.service";
import { UserAccountAuthority } from "../../model/dto/new-user-account-dto";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService
  extends ACrudService<Department>
  implements IByAuthService<Department>, CUDService<Department> {

  constructor(private authService: AuthService,
              http: HttpClient,
              config: RestConfig) {
    super(`${config.baseUrl}/admin/departments`, http);
  }

  getAllByAuth(): Observable<Department[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.authority === UserAccountAuthority.ENTERPRISE_ADMIN) {
      return this.getAllByEnterpriseId(userAccount.enterpriseId);
    }
  }

  getAllByEnterpriseId(enterpriseId: number): Observable<Department[]> {
    return this.http.get<Department[]>(
      `${this.url}/enterprises/${enterpriseId}`
    );
  }

  getCurrent(): Observable<Department> {
    return this.http.get<Department>(
      `${this.url}/current`
    );
  }
}
