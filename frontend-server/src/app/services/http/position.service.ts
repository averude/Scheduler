import { Injectable } from '@angular/core';
import { Position } from '../../model/position';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";
import { ACrudService } from "./abstract-service/a-crud-service";
import { HasDepartmentIdService } from "./interface/has-department-id.service";

@Injectable({
  providedIn: 'root'
})
export class PositionService
  extends ACrudService<Position>
  implements CUDService<Position>, HasDepartmentIdService<Position> {

  constructor(private authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/positions`, http);
  }

  getAllByDepartmentId(departmentId: number): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.url}/departments/${departmentId}`
    ).pipe(
      map(value => value.sort((a, b) => a.id - b.id))
    );
  }
}
