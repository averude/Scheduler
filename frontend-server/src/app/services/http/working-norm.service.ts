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
import { ByAuthService, ServiceAuthDecider } from "./auth-decider/service-auth-decider";
import { UserAccountAuthority } from "../../model/dto/new-user-account-dto";

@Injectable({
  providedIn: "root"
})
export class WorkingNormService
  extends ACrudService<WorkingNorm>
  implements CUDService<WorkingNorm>, ByAuthService<WorkingNorm> {

  constructor(private authService: AuthService,
              private decider: ServiceAuthDecider,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/working_norm`, http);
  }

  getAllDto(from?: string, to?: string): Observable<BasicDTO<Shift, WorkingNorm>[]> {
    return this.getAllDTOByAuth(from, to).pipe(
      map(value => value.sort((a, b) => a.parent.id - b.parent.id))
    );
  }

  getAllDTOByAuth(from: string, to: string): Observable<BasicDTO<Shift, WorkingNorm>[]> {
    const userAccount = this.authService.currentUserAccount;

    if (userAccount.authority === UserAccountAuthority.DEPARTMENT_ADMIN) {
      return this.getAllDTOByDepartmentId(userAccount.departmentId, from ,to);
    }
  }

  getAllDTOByDepartmentId(departmentId: number, from: string, to: string): Observable<BasicDTO<Shift, WorkingNorm>[]> {
    return this.http.get<BasicDTO<Shift, WorkingNorm>[]>(
      `${this.url}/dto/departments/${departmentId}/dates?from=${from}&to=${to}`
    );
  }

  getAll(from?: string, to?: string): Observable<WorkingNorm[]> {
    return this.getAllByAuth(from, to);
  }

  getAllByAuth(from: string, to: string): Observable<WorkingNorm[]> {
    const userAccount = this.authService.currentUserAccount;
    return this.decider.getAllByAuth(this, userAccount, from, to)
      .pipe(parseDateOfEntities);
  }

  getAllByDepartmentId(departmentId: number,
                       from: string,
                       to: string): Observable<WorkingNorm[]> {
    return this.http.get<WorkingNorm[]>(
      `${this.url}/departments/${departmentId}/dates?from=${from}&to=${to}`
    );
  }

  getAllByShiftIds(shiftIds: number[],
                   from: string,
                   to: string): Observable<WorkingNorm[]> {
    return this.http.get<WorkingNorm[]>(
      `${this.url}/shifts/${shiftIds}/dates?from=${from}&to=${to}`
    );
  }

  generate(generationDto: GenerationDto): Observable<any> {
    return this.http.post(
      `${this.url}/generate`,
      generationDto,
      {responseType: 'text'}
    );
  }
}
