import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ShiftPatternDto } from "../model/dto/basic-dto";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class ShiftPatternDtoService
  extends ACrudService<ShiftPatternDto> implements CUDService<ShiftPatternDto> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/patterns/dto`, http, authService);
  }

  create(dto: ShiftPatternDto): Observable<ShiftPatternDto> {
    return this.http.post<ShiftPatternDto>(`${this.url}`, dto);
  }

  update(dto: ShiftPatternDto): Observable<ShiftPatternDto> {
    return this.http.put<ShiftPatternDto>(`${this.url}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/patterns/${id}`,
      {responseType: 'text'}
    );
  }
}
