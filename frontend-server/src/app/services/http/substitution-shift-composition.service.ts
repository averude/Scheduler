import { ACrudService } from "./abstract-service/a-crud-service";
import { SubstitutionShiftComposition } from "../../model/main-shift-composition";
import { CUDService } from "./interface/cud-service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { RestConfig } from "../../rest.config";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as moment from "moment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SubstitutionShiftCompositionService
  extends ACrudService<SubstitutionShiftComposition> implements CUDService<SubstitutionShiftComposition> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/substitution_shift_compositions`, http);
  }

  getAll(from?: string, to?: string): Observable<SubstitutionShiftComposition[]> {
    return super.getAll(from, to)
      .pipe(tap(compositions => compositions.forEach(composition => {
        composition.from  = moment.utc(composition.from);
        composition.to    = moment.utc(composition.to);
      })));
  }
}
