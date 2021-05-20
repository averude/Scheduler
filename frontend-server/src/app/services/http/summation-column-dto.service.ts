import { Injectable } from "@angular/core";
import { ACrudService } from "./abstract-service/a-crud-service";
import { BasicDTO } from "../../model/dto/basic-dto";
import { SummationColumn } from "../../model/summation-column";
import { SummationColumnDayTypeRange } from "../../model/summation-column-day-type-range";
import { CUDService } from "./interface/cud-service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class SummationColumnDtoService
  extends ACrudService<BasicDTO<SummationColumn, SummationColumnDayTypeRange>>
  implements CUDService<BasicDTO<SummationColumn, SummationColumnDayTypeRange>> {

  constructor(http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/summation_columns/dto`, http);
  }

  getAllByEnterpriseId(enterpriseId: number): Observable<BasicDTO<SummationColumn, SummationColumnDayTypeRange>[]> {
    return this.http.get<BasicDTO<SummationColumn, SummationColumnDayTypeRange>[]>(
      `${this.url}/enterprises/${enterpriseId}`
    );
  }
}
