import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { PasswordChangeDTO } from "../../model/dto/new-user-account-dto";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http: HttpClient,
              private config: RestConfig) {}

  current(): Observable<any> {
    return this.http.get(
      `${this.config.baseUrl}/uaa/current/full_name`,
      {responseType: 'text'}
      );
  }

  changePassword(passwordChangeDTO: PasswordChangeDTO): Observable<any> {
    return this.http.post<any>(
      `${this.config.baseUrl}/uaa/current/password`,
      passwordChangeDTO
    );
  }
}
