import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BasicDto } from "../../model/dto/basic-dto";
import { ACrudService } from "./abstract-service/a-crud-service";
import { ShiftPattern } from "../../model/shift-pattern";
import { PatternUnit } from "../../model/pattern-unit";

@Injectable({
  providedIn: 'root'
})
export class ShiftPatternDtoService
  extends ACrudService<BasicDto<ShiftPattern, PatternUnit>> implements CUDService<BasicDto<ShiftPattern, PatternUnit>> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/patterns/dto`, http);
  }

  create(dto: BasicDto<ShiftPattern, PatternUnit>): Observable<BasicDto<ShiftPattern, PatternUnit>> {
    return this.http.post<BasicDto<ShiftPattern, PatternUnit>>(`${this.url}`, dto);
  }

  update(dto: BasicDto<ShiftPattern, PatternUnit>): Observable<BasicDto<ShiftPattern, PatternUnit>> {
    return this.http.put<BasicDto<ShiftPattern, PatternUnit>>(`${this.url}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/patterns/${id}`,
      {responseType: 'text'}
    );
  }
}
