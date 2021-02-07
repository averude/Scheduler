import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { Observable } from "rxjs";
import { WorkingNorm } from "../../model/working-norm";
import { HttpClient } from "@angular/common/http";
import { parseDateOfEntities } from "../../shared/utils/utils";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { BasicDTO } from "../../model/dto/basic-dto";
import { Shift } from "../../model/shift";
import { GenerationDto } from "../../model/dto/generation-dto";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WorkingNormService
  extends ACrudService<WorkingNorm> implements CUDService<WorkingNorm> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/working_norm`, http);
  }

  getAllDto(from?: string, to?: string): Observable<BasicDTO<Shift, WorkingNorm>[]> {
    return this.http.get<BasicDTO<Shift, WorkingNorm>[]>(
      `${this.url}/dto/dates?from=${from}&to=${to}`
    ).pipe(
      map(value => value.sort((a, b) => a.parent.id - b.parent.id))
    );
  }

  getAll(from?: string, to?: string): Observable<WorkingNorm[]> {
    return super.getAll(from, to).pipe(parseDateOfEntities);
  }

  getAllByDepartmentId(departmentId: number,
                       from: string,
                       to: string): Observable<WorkingNorm[]> {
    return this.http.get<WorkingNorm[]>(
      `${this.url}/department/${departmentId}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  }

  getAllByShiftIds(shiftIds: number[],
                   from: string,
                   to: string): Observable<WorkingNorm[]> {
    return this.http.get<WorkingNorm[]>(
      `${this.url}/shifts/${shiftIds}/dates?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  }

  generate(generationDto: GenerationDto): Observable<any> {
    return this.http.post(
      `${this.url}/generate`,
      generationDto,
      {responseType: 'text'}
    );
  }
}
