import { ACrudService } from "./abstract-service/a-crud-service";
import { SummationColumn } from "../../model/summation-column";
import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Observable } from "rxjs";

// @Injectable({
//   providedIn: "root"
// })
export class SummationColumnService
  extends ACrudService<SummationColumn> implements CUDService<SummationColumn> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/summation_columns`, http);
  }

  getAllByAuth(): Observable<SummationColumn[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.enterpriseId) {
      return this.getAllByEnterpriseId(userAccount.enterpriseId);
    }
  }

  getAllByEnterpriseId(enterpriseId: number): Observable<SummationColumn[]> {
    return this.http.get<SummationColumn[]>(
      `${this.url}/enterprises/${enterpriseId}`
    );
  }
}
