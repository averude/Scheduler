import { Injectable } from "@angular/core";
import { Enterprise } from "../../model/enterprise";
import { CUDService } from "./interface/cud-service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { ACrudService } from "./abstract-service/a-crud-service";
import { AuthService } from "./auth.service";
import { UserAccountLevel } from "../../model/dto/user-account-dto";

@Injectable({providedIn: 'root'})
export class EnterpriseService
  extends ACrudService<Enterprise>
  implements CUDService<Enterprise> {

  constructor(private authService: AuthService,
              http: HttpClient,
              config: RestConfig) {
    super(`${config.baseUrl}/enterprises`, http);
  }

  getAll(from?: string, to?: string): Observable<Enterprise[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.level === UserAccountLevel.GLOBAL) {
      return super.getAll();
    }
  }

  getCurrent(): Observable<Enterprise> {
    return this.http.get<Enterprise>(`${this.url}/current`);
  }
}
