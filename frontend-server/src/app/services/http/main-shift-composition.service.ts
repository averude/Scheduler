import { Injectable } from "@angular/core";
import { MainShiftComposition } from "../../model/main-shift-composition";
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
export class MainShiftCompositionService
  extends ACrudService<MainShiftComposition> implements CUDService<MainShiftComposition> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/main_shift_compositions`, http);
  }

  getAll(from?: string, to?: string): Observable<MainShiftComposition[]> {
    return super.getAll(from, to)
      .pipe(tap(compositions => compositions.forEach(composition => {
        composition.from  = moment.utc(composition.from);
        composition.to    = moment.utc(composition.to);
      })));
  }
}
