import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { Observable } from "rxjs";
import { WorkingNorm } from "../../model/working-norm";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";
import { BasicDTO } from "../../model/dto/basic-dto";
import { Shift } from "../../model/shift";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WorkingNormService
  extends ACrudService<WorkingNorm>
  implements CUDService<WorkingNorm> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/working_norms`, http);
  }

  getAllDTOByDepartmentId(departmentId: number, from: string, to: string): Observable<BasicDTO<Shift, WorkingNorm>[]> {
    return this.http.get<BasicDTO<Shift, WorkingNorm>[]>(
      `${this.url}/departments/${departmentId}/dto?from=${from}&to=${to}`
    ).pipe(
      map(value => value.sort((a, b) => a.parent.id - b.parent.id))
    );
  }

  getAllByDepartmentId(departmentId: number,
                       from: string,
                       to: string): Observable<WorkingNorm[]> {
    return this.http.get<WorkingNorm[]>(
      `${this.url}/departments/${departmentId}?from=${from}&to=${to}`
    );
  }

  getAllByShiftIds(shiftIds: number[],
                   from: string,
                   to: string): Observable<WorkingNorm[]> {
    return this.http.get<WorkingNorm[]>(
      `${this.url}/shifts/${shiftIds}?from=${from}&to=${to}`
    );
  }
}
