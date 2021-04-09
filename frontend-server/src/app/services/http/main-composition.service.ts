import { Injectable } from "@angular/core";
import { MainComposition } from "../../model/composition";
import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service"
import { ACrudService } from "./abstract-service/a-crud-service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { convertDateStringToMoment } from "./schedule.service";

@Injectable({
  providedIn: "root"
})
export class MainCompositionService
  extends ACrudService<MainComposition> implements CUDService<MainComposition> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/main_compositions`, http);
  }

  create(t: MainComposition): Observable<MainComposition> {
    return super.create(t)
      .pipe(map(convertDateStringToMoment));
  }

  update(t: MainComposition): Observable<MainComposition> {
    return super.update(t)
      .pipe(map(convertDateStringToMoment));
  }
}
