import { Injectable } from "@angular/core";
import { IByAuthService } from "./interface/i-by-auth.service";
import { Enterprise } from "../../model/enterprise";
import { CUDService } from "./interface/cud-service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { ACrudService } from "./abstract-service/a-crud-service";
import { AuthService } from "./auth.service";
import { UserAccountAuthority } from "../../model/dto/new-user-account-dto";

@Injectable({providedIn: 'root'})
export class EnterpriseService
  extends ACrudService<Enterprise>
  implements IByAuthService<Enterprise>, CUDService<Enterprise> {

  constructor(private authService: AuthService,
              http: HttpClient,
              config: RestConfig) {
    super(`${config.baseUrl}/admin/enterprises`, http);
  }

  getAll(from?: string, to?: string): Observable<Enterprise[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.authority === UserAccountAuthority.GLOBAL_ADMIN) {
      return super.getAll();
    }
  }

  getCurrent(): Observable<Enterprise> {
    return this.http.get<Enterprise>(`${this.url}/current`);
  }
}
