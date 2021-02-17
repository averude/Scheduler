import { Injectable } from "@angular/core";
import { ACrudService } from "./abstract-service/a-crud-service";
import { BasicDTO } from "../../model/dto/basic-dto";
import { SummationColumn } from "../../model/summation-column";
import { SummationColumnDayTypeRange } from "../../model/summation-column-day-type-range";
import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class SummationColumnDtoService
  extends ACrudService<BasicDTO<SummationColumn, SummationColumnDayTypeRange>>
  implements CUDService<BasicDTO<SummationColumn, SummationColumnDayTypeRange>> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/summation_columns/dto`, http);
  }

  getAll(): Observable<BasicDTO<SummationColumn, SummationColumnDayTypeRange>[]> {
    return this.getAllByAuth();
  }

  getAllByAuth(): Observable<BasicDTO<SummationColumn, SummationColumnDayTypeRange>[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.enterpriseId) {
      return this.getAllByEnterpriseId(userAccount.enterpriseId);
    }
  }

  getAllByEnterpriseId(enterpriseId: number): Observable<BasicDTO<SummationColumn, SummationColumnDayTypeRange>[]> {
    return this.http.get<BasicDTO<SummationColumn, SummationColumnDayTypeRange>[]>(
      `${this.url}/enterprises/${enterpriseId}`
    );
  }

  create(dto: BasicDTO<SummationColumn, SummationColumnDayTypeRange>): Observable<BasicDTO<SummationColumn, SummationColumnDayTypeRange>> {
    return this.http.post<BasicDTO<SummationColumn, SummationColumnDayTypeRange>>(`${this.url}`, dto);
  }

  update(dto: BasicDTO<SummationColumn, SummationColumnDayTypeRange>): Observable<BasicDTO<SummationColumn, SummationColumnDayTypeRange>> {
    return this.http.put<BasicDTO<SummationColumn, SummationColumnDayTypeRange>>(`${this.url}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/summation_columns/${id}`,
      {responseType: 'text'}
    );
  }
}
