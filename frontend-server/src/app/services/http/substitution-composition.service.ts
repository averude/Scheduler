import { ACrudService } from "./abstract-service/a-crud-service";
import { SubstitutionComposition } from "../../model/composition";
import { CUDService } from "./interface/cud-service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { RestConfig } from "../../rest.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { convertDateStringToMoment } from "./schedule.service";

@Injectable({
  providedIn: "root"
})
export class SubstitutionCompositionService
  extends ACrudService<SubstitutionComposition> implements CUDService<SubstitutionComposition> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/substitution_compositions`, http);
  }

  create(t: SubstitutionComposition): Observable<SubstitutionComposition> {
    return super.create(t).pipe(map(convertDateStringToMoment));
  }

  update(t: SubstitutionComposition): Observable<SubstitutionComposition> {
    return super.update(t).pipe(map(convertDateStringToMoment));
  }
}
