import { Injectable } from "@angular/core";
import { ShiftComposition } from "../model/shift-composition";
import { RestConfig } from "../rest.config";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { CUDService } from "./interface/cud-service"
import { ACrudService } from "./abstract-service/a-crud-service";

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
}
