import { RestConfig } from "../../rest.config";
import { CUDService } from "./interface/cud-service";
import { ReportSheetDTO } from "../../model/dto/report-sheet-dto";
import { ACrudService } from "./abstract-service/a-crud-service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { UserAccountAuthority } from "../../model/dto/new-user-account-dto";

@Injectable({
  providedIn: "root"
})
export class ReportSheetDTOService
  extends ACrudService<ReportSheetDTO> implements CUDService<ReportSheetDTO> {

  constructor(private authService: AuthService,
              private config: RestConfig,
              http: HttpClient) {
    super(`${config.baseUrl}/admin/report_sheets`, http);
  }

  getAll(from?: string, to?: string): Observable<ReportSheetDTO[]> {
    return this.getAllByAuth();
  }

  getAllByAuth(): Observable<ReportSheetDTO[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.authority === UserAccountAuthority.DEPARTMENT_ADMIN) {
      return this.getAllByDepartmentId(userAccount.departmentId);
    }
  }

  getAllByDepartmentId(departmentId: number): Observable<ReportSheetDTO[]> {
    return this.http.get<ReportSheetDTO[]>(
      `${this.url}/departments/${departmentId}`
    );
  }
}
