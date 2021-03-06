import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ACrudService } from "./abstract-service/a-crud-service";
import { ShiftPatternDTO } from "../../model/dto/shift-pattern-dto";
import { HasDepartmentIdService } from "./interface/has-department-id.service";

@Injectable({
  providedIn: 'root'
})
export class ShiftPatternDtoService
  extends ACrudService<ShiftPatternDTO>
  implements CUDService<ShiftPatternDTO>, HasDepartmentIdService<ShiftPatternDTO> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/shift_patterns`, http);
  }

  getAllByDepartmentId(departmentId: number): Observable<ShiftPatternDTO[]> {
    return this.http.get<ShiftPatternDTO[]>(
      `${this.url}/departments/${departmentId}/dto`
    );
  }

  create(dto: ShiftPatternDTO): Observable<ShiftPatternDTO> {
    return this.http.post<ShiftPatternDTO>(`${this.url}/dto`, dto);
  }

  update(dto: ShiftPatternDTO): Observable<ShiftPatternDTO> {
    return this.http.put<ShiftPatternDTO>(`${this.url}/dto`, dto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/shift_patterns/${id}`,
      {responseType: 'text'}
    );
  }
}
