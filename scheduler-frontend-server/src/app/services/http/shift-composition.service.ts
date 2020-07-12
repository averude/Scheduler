import { Injectable } from "@angular/core";
import { ShiftComposition } from "../../model/shift-composition";
import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service"
import { ACrudService } from "./abstract-service/a-crud-service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as moment from 'moment';

@Injectable({
  providedIn: "root"
})
export class ShiftCompositionService
  extends ACrudService<ShiftComposition> implements CUDService<ShiftComposition> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/shift_compositions`, http);
  }

  getAll(from?: string, to?: string): Observable<ShiftComposition[]> {
    return super.getAll(from, to)
      .pipe(tap(compositions => compositions.forEach(composition => {
        composition.from  = moment(composition.from);
        composition.to    = moment(composition.to);
      })));
  }
}
