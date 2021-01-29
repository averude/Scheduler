import { RestConfig } from "../../rest.config";
import { CUDService } from "./interface/cud-service";
import { ReportSheetDTO } from "../../model/dto/report-sheet-dto";
import { ACrudService } from "./abstract-service/a-crud-service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ReportSheetDTOService
  extends ACrudService<ReportSheetDTO> implements CUDService<ReportSheetDTO> {

  constructor(private config: RestConfig, http: HttpClient) {
    super(`${config.baseUrl}/admin/report_sheets`, http);
  }
}
