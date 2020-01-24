import { Injectable } from '@angular/core';
import { Position } from '../model/position';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { AuthService } from "./auth.service";
import { ABaseService } from "./abstract-service/a-base-service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PositionService
  extends ABaseService<Position> implements CUDService<Position> {

  constructor(authService: AuthService,
              private http: HttpClient,
              private config: RestConfig) {
    super(authService);
  }

  getAll(): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.config.baseUrl}/admin/positions`
    ).pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }

  getAllByDepartmentId(departmentId: number): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.config.baseUrl}/admin/positions/departments/${departmentId}`
    ).pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }

  getAllByShiftId(shiftId: number): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.config.baseUrl}/admin/positions/shifts/${shiftId}`
    ).pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }

  create(position: Position): Observable<any> {
     return this.http.post<number>(
       `${this.config.baseUrl}/admin/positions`,
       position,
     );
  }

  update(position: Position): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/positions`,
      position,
      {responseType: 'text'}
    );
  }

  delete(positionId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/positions/${positionId}`,
      {responseType: 'text'}
    );
  }
}
