import { forkJoin, Observable, of } from "rxjs";
import { AdminCommonDataDTO } from "../../../model/dto/united/admin-common-data-dto";
import { RatioColumnService } from "../ratio-column.service";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../../rest.config";

export const DEPARTMENTS: number[] = [11, 16, 17, 18, 19, 20];

@Injectable({
  providedIn: 'root'
})
export class AdminCommonDataService {

  constructor(private httpClient: HttpClient,
              private config: RestConfig,
              private ratioColumnService: RatioColumnService) {}

  getByEnterpriseAndDepartmentId(enterpriseId: number,
                                 departmentId: number): Observable<AdminCommonDataDTO> {
    const obs: Observable<any>[] = [
      // Temporary
      DEPARTMENTS
        .indexOf(departmentId) >= 0 ? this.ratioColumnService.getAllByEnterpriseId(enterpriseId) : of([]),
      //
      this.httpClient.get<AdminCommonDataDTO>(
        `${this.config.baseUrl}/enterprises/${enterpriseId}/departments/${departmentId}/admin_common_data`
      )
    ];

    return forkJoin(obs).pipe(
      map(([ratioColumns, adminCommonData]) => {
        adminCommonData.ratioColumns = ratioColumns;
        return adminCommonData;
      })
    )
  }
}
