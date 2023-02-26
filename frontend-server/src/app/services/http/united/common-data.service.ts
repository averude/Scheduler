import { Observable } from "rxjs";
import { CommonDataDTO } from "../../../model/dto/united/common-data-dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../../rest.config";

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor(private httpClient: HttpClient,
              private config: RestConfig){
  }
  
  getByEnterpriseIdAndDepartmentId(enterpriseId: number,
                                   departmentId: number): Observable<CommonDataDTO> {
    return this.httpClient.get<CommonDataDTO>(
      `${this.config.baseUrl}/enterprises/${enterpriseId}/departments/${departmentId}/common_data`
    );
  }
}
