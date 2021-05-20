import { Observable } from "rxjs";
import { BasicDTO } from "../../model/dto/basic-dto";
import { WorkScheduleView } from "../../model/work-schedule-view";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { ACrudService } from "./abstract-service/a-crud-service";
import { CUDService } from "./interface/cud-service";
import { HasDepartmentIdService } from "./interface/has-department-id.service";
import { HasEnterpriseIdService } from "./interface/has-enterprise-id.service";

@Injectable({providedIn: "root"})
export class WorkScheduleViewDTOService
  extends ACrudService<BasicDTO<WorkScheduleView, number>>
  implements HasEnterpriseIdService<BasicDTO<WorkScheduleView, number>>,
    HasDepartmentIdService<WorkScheduleView>,
    CUDService<BasicDTO<WorkScheduleView, number>> {

  constructor(http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/views`, http);
  }

  getAllByEnterpriseId(enterpriseId: number): Observable<BasicDTO<WorkScheduleView, number>[]> {
    return this.http.get<BasicDTO<WorkScheduleView, number>[]>(
      `${this.url}/dto/enterprises/${enterpriseId}`
    );
  }

  getAllByDepartmentId(departmentId: number): Observable<WorkScheduleView[]> {
    return this.http.get<WorkScheduleView[]>(
      `${this.url}/departments/${departmentId}`
    );
  }


  create(dto: BasicDTO<WorkScheduleView, number>): Observable<BasicDTO<WorkScheduleView, number>> {
    return this.http.post<BasicDTO<WorkScheduleView, number>>(`${this.url}/dto`, dto);
  }

  update(dto: BasicDTO<WorkScheduleView, number>): Observable<BasicDTO<WorkScheduleView, number>> {
    return this.http.put<BasicDTO<WorkScheduleView, number>>(`${this.url}/dto`, dto);
  }
}
