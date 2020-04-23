import { Injectable } from '@angular/core';
import { ShiftPattern } from '../model/shift-pattern';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class ShiftPatternService
  extends ACrudService<ShiftPattern> implements CUDService<ShiftPattern> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/patterns`, http, authService);
  }
}
