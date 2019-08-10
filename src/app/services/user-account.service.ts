import { CrudService } from "./interface/crud.service";
import { UserAccount } from "../model/user-account";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService implements CrudService<UserAccount> {

  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getAll(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(
      `${this.config.baseUrl}/uaa/users`
    );
  }

  create(userAccount: UserAccount): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/uaa/users`,
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

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/uaa/users/${id}`,
      {responseType: 'text'}
    );
  }

}
