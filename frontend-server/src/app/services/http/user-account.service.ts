import {
  DepartmentAdminUserAccount,
  EnterpriseAdminUserAccount,
  ShiftAdminUserAccount,
  UserAccount
} from "../../model/accounts/user-account";
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
    return this.http.post(
      `${this.config.baseUrl}/uaa/users/enterprise_admins`,
      userAccount,
      {responseType: 'text'}
    );
  }

  createEnterpriseAdmin(userAccount: EnterpriseAdminUserAccount): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/uaa/users/enterprise_admins`,
      userAccount,
      {responseType: 'text'}
    );
  }

  createDepartmentAdmin(userAccount: DepartmentAdminUserAccount): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/uaa/users/department_admins`,
      userAccount,
      {responseType: 'text'}
    );
  }

  createShiftAdmin(userAccount: ShiftAdminUserAccount): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/uaa/users/shift_admins`,
      userAccount,
      {responseType: 'text'}
    );
  }

  update(userAccount: UserAccount): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/uaa/users`,
      userAccount,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/uaa/users/${id}`,
      {responseType: 'text'}
    );
  }
}
