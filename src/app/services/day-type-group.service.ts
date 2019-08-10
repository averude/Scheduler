import { CrudService } from "./interface/crud.service";
import { DayTypeGroup } from "../model/day-type-group";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DayTypeGroupService implements CrudService<DayTypeGroup> {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getAll(): Observable<DayTypeGroup[]> {
    return this.http.get<DayTypeGroup[]>(
      `${this.config.baseUrl}/admin/daytypegroups`
    );
  }

  create(dayTypeGroup: DayTypeGroup): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/daytypegroups`,
      dayTypeGroup
    );
  }

  update(dayTypeGroup: DayTypeGroup): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/daytypegroups`,
      dayTypeGroup,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/daytypegroups/${id}`,
      {responseType: 'text'}
    );
  }
}
