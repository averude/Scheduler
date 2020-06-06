import { Injectable } from '@angular/core';
import { Position } from '../model/position';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class PositionService
  extends ACrudService<Position> implements CUDService<Position> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/positions`, http);
  }

  getAll(): Observable<Position[]> {
    return super.getAll().pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }
}
