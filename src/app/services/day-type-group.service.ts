import { DayTypeGroup } from "../model/day-type-group";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { Injectable } from "@angular/core";
import { IByAuthService } from "./interface/i-by-auth.service";
import { CUDService } from "./interface/cud-service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DayTypeGroupService implements IByAuthService<DayTypeGroup>, CUDService<DayTypeGroup> {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getAllByAuth(): Observable<DayTypeGroup[]> {
    return this.http.get<DayTypeGroup[]>(
      `${this.config.baseUrl}/admin/day_type_groups`
    ).pipe(map(values => values.sort((a, b) => a.id - b.id)));
  }

  create(dayTypeGroup: DayTypeGroup): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/day_type_groups`,
      dayTypeGroup
    );
  }

  update(dayTypeGroup: DayTypeGroup): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/day_type_groups`,
      dayTypeGroup,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/day_type_groups/${id}`,
      {responseType: 'text'}
    );
  }
}
