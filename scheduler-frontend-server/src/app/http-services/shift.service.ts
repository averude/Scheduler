import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from '../model/shift';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";
import { CUDService } from "./interface/cud-service";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: 'root'
})
export class ShiftService
  extends ACrudService<Shift> implements CUDService<Shift> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/shifts`, http);
  }

  getAllByShiftId(shiftId: number): Observable<Shift[]> {
    return this.getById(shiftId).pipe(map(shift => [shift]));
  }
}
