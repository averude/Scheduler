import { Injectable } from "@angular/core";
import { ACrudService } from "./abstract-service/a-crud-service";
import { BasicDto } from "../model/dto/basic-dto";
import { SummationColumn } from "../model/summation-column";
import { SummationColumnDayTypeRange } from "../model/summation-column-day-type-range";
import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class SummationColumnDtoService
  extends ACrudService<BasicDto<SummationColumn, SummationColumnDayTypeRange>>
  implements CUDService<BasicDto<SummationColumn, SummationColumnDayTypeRange>> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/summation_columns/dto`, http);
  }

  create(dto: BasicDto<SummationColumn, SummationColumnDayTypeRange>): Observable<BasicDto<SummationColumn, SummationColumnDayTypeRange>> {
    return this.http.post<BasicDto<SummationColumn, SummationColumnDayTypeRange>>(`${this.url}`, dto);
  }

  update(dto: BasicDto<SummationColumn, SummationColumnDayTypeRange>): Observable<BasicDto<SummationColumn, SummationColumnDayTypeRange>> {
    return this.http.put<BasicDto<SummationColumn, SummationColumnDayTypeRange>>(`${this.url}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/summation_columns/${id}`,
      {responseType: 'text'}
    );
  }
}
