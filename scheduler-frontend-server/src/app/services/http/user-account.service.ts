import { DepartmentAdminUserAccount, EnterpriseAdminUserAccount, UserAccount } from "../../model/accounts/user-account";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { CUDService } from "./interface/cud-service";
import { IByAuthService } from "./interface/i-by-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService implements IByAuthService<UserAccount>, CUDService<UserAccount> {

  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.config.baseUrl}/uaa/users`
    );
  }

  create(userAccount: UserAccount): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/uaa/users/enterprise_admins`,
      userAccount
    );
  }

  createEnterpriseAdmin(userAccount: EnterpriseAdminUserAccount): Observable<any> {
    return this.http.post<string>(
      `${this.config.baseUrl}/uaa/users/enterprise_admins`,
      userAccount
    );
  }

  createDepartmentAdmin(userAccount: DepartmentAdminUserAccount): Observable<any> {
    return this.http.post<string>(
      `${this.config.baseUrl}/uaa/users/department_admins`,
      userAccount
    );
  }

  update(userAccount: UserAccount): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/uaa/users`,
      userAccount,
      {responseType: 'text'}
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/uaa/users/${id}`,
      {responseType: 'text'}
    );
  }

}
