import { RestConfig } from "../../rest.config";
import { CUDService } from "./interface/cud-service";
import { ReportSheetDTO } from "../../model/dto/report-sheet-dto";
import { ACrudService } from "./abstract-service/a-crud-service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { HasDepartmentIdService } from "./interface/has-department-id.service";

@Injectable({
  providedIn: "root"
})
export class ReportSheetDTOService
  extends ACrudService<ReportSheetDTO>
  implements CUDService<ReportSheetDTO>, HasDepartmentIdService<ReportSheetDTO> {

  constructor(private authService: AuthService,
              private config: RestConfig,
              http: HttpClient) {
    super(`${config.baseUrl}/report_sheets`, http);
  }

  getAllByDepartmentId(departmentId: number): Observable<ReportSheetDTO[]> {
    return this.http.get<ReportSheetDTO[]>(
      `${this.url}/departments/${departmentId}`
    );
  }
}
