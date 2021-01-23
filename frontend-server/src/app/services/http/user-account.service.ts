import { UserAccount } from "../../model/accounts/user-account";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { CUDService } from "./interface/cud-service";
import { IByAuthService } from "./interface/i-by-auth.service";
import { AccountDTO } from "../../model/dto/account-dto";

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

  getAllShiftUsers(): Observable<AccountDTO[]> {
    return this.http.get<AccountDTO[]>(
      `${this.config.baseUrl}/uaa/users/shift_admins`
    );
  }

  current(): Observable<any> {
    return this.http.get(
      `${this.config.baseUrl}/uaa/current/full_name`,
      {responseType: 'text'}
      );
  }

  create(userAccount: UserAccount): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/uaa/users/enterprise_admins`,
      userAccount,
      {responseType: 'text'}
    );
  }

  createEnterpriseAdmin(userAccount: UserAccount): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/uaa/users/enterprise_admins`,
      userAccount,
      {responseType: 'text'}
    );
  }

  createDepartmentAdmin(userAccount: UserAccount): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/uaa/users/department_admins`,
      userAccount,
      {responseType: 'text'}
    );
  }

  createShiftAdmin(accountDTO: AccountDTO): Observable<number> {
    return this.http.post<number>(
      `${this.config.baseUrl}/uaa/users/shift_admins`,
      accountDTO
    );
  }

  updateShiftAdmin(accountDTO: AccountDTO): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/uaa/users/shift_admins`,
      accountDTO,
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
