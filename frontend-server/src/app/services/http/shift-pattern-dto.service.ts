import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ACrudService } from "./abstract-service/a-crud-service";
import { ShiftPatternDTO } from "../../model/dto/shift-pattern-dto";

@Injectable({
  providedIn: 'root'
})
export class ShiftPatternDtoService
  extends ACrudService<ShiftPatternDTO> implements CUDService<ShiftPatternDTO> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/patterns/dto`, http);
  }

  create(dto: ShiftPatternDTO): Observable<ShiftPatternDTO> {
    return this.http.post<ShiftPatternDTO>(`${this.url}`, dto);
  }

  update(dto: ShiftPatternDTO): Observable<ShiftPatternDTO> {
    return this.http.put<ShiftPatternDTO>(`${this.url}`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/patterns/${id}`,
      {responseType: 'text'}
    );
  }
}
