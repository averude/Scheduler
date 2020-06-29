import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { Observable } from "rxjs";
import { WorkingTime } from "../../model/working-time";
import { HttpClient } from "@angular/common/http";
import { parseDateOfEntities } from "../../shared/utils/utils";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { BasicDto } from "../../model/dto/basic-dto";
import { Shift } from "../../model/shift";
import { GenerationDto } from "../../model/dto/generation-dto";

@Injectable({
  providedIn: "root"
})
export class WorkingTimeService
  extends ACrudService<WorkingTime> implements CUDService<WorkingTime> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/working_time`, http);
  }

  getAllDto(from?: string, to?: string): Observable<BasicDto<Shift, WorkingTime>[]> {
    return this.http.get<BasicDto<Shift, WorkingTime>[]>(
      `${this.url}/dto/dates?from=${from}&to=${to}`
    );
  }

  getAll(from?: string, to?: string): Observable<WorkingTime[]> {
    return super.getAll(from, to).pipe(parseDateOfEntities);
  }

  generate(generationDto: GenerationDto): Observable<any> {
    return this.http.post(
      `${this.url}/generate`,
      generationDto,
      {responseType: 'text'}
    );
  }
}
