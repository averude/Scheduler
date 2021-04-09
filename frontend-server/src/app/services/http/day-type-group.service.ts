import { DayTypeGroup } from "../../model/day-type-group";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../rest.config";
import { Injectable } from "@angular/core";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";
import { ACrudService } from "./abstract-service/a-crud-service";

@Injectable({
  providedIn: "root"
})
export class DayTypeGroupService
  extends ACrudService<DayTypeGroup>
  implements CUDService<DayTypeGroup> {

  constructor(http: HttpClient,
              config: RestConfig) {
    super(`${config.baseUrl}/day_type_groups`, http);
  }

  getAll(): Observable<DayTypeGroup[]> {
    return super.getAll().pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }
}
