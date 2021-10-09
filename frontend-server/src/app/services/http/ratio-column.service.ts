import { ACrudService } from "./abstract-service/a-crud-service";
import { CUDService } from "./interface/cud-service";
import { HasEnterpriseIdService } from "./interface/has-enterprise-id.service";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { RatioColumn } from "../../model/ratio-column";

@Injectable({
  providedIn: 'root'
})
export class RatioColumnService
  extends ACrudService<RatioColumn>
  implements CUDService<RatioColumn>, HasEnterpriseIdService<RatioColumn> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/ratio_columns`, http);
  }

  getAllByEnterpriseId(enterpriseId: number, from?: string, to?: string): Observable<RatioColumn[]> {
    return of([
      {
        id: 1,
        name: 'Ratio',
        enterpriseId: 2,
        dayTypeId: 26
      }]);
  }

}
