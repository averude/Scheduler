import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { PasswordChangeDTO, UserAccountDTO } from "../../model/dto/user-account-dto";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http: HttpClient,
              private config: RestConfig) {}

  me(): Observable<UserAccountDTO> {
    return this.http.get<UserAccountDTO>(
      `${this.config.baseUrl}/uaa/me`
    );
  }

  changePassword(passwordChangeDTO: PasswordChangeDTO): Observable<any> {
    return this.http.post<any>(
      `${this.config.baseUrl}/uaa/current/password`,
      passwordChangeDTO
    );
  }
}
