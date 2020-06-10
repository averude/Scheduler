import { ACrudService } from "./abstract-service/a-crud-service";
import { SummationColumn } from "../../model/summation-column";
import { Injectable } from "@angular/core";
import { CUDService } from "./interface/cud-service";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";

@Injectable({
  providedIn: "root"
})
export class SummationColumnService
  extends ACrudService<SummationColumn> implements CUDService<SummationColumn> {

  constructor(authService: AuthService,
              http: HttpClient,
              private config: RestConfig) {
    super(`${config.baseUrl}/admin/summation_columns`, http);
  }
}
