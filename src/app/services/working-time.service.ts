import { Injectable } from "@angular/core";
import { RestConfig } from "../rest.config";
import { Observable } from "rxjs";
import { WorkingTime } from "../model/working-time";
import { HttpClient } from "@angular/common/http";
import { parseDateOfEntities } from "../shared/utils/utils";
import { PageableByDateCrudService } from "./interface/pageable-by-date-crud.service";

@Injectable({
  providedIn: "root"
})
export class WorkingTimeService implements PageableByDateCrudService<WorkingTime> {

  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getAll(): Observable<WorkingTime[]> {
    return this.http.get<WorkingTime[]>(
      `${this.config.baseUrl}/admin/workingtime`
    ).pipe(parseDateOfEntities);
  }

  getAllByDate(from: string, to: string): Observable<WorkingTime[]> {
    return this.http.get<WorkingTime[]>(
      `${this.config.baseUrl}/admin/workingtime/search?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  }

  create(workingTime: WorkingTime): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/workingtime`,
      workingTime,
    );
  }

  update(workingTime: WorkingTime): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/workingtime`,
      workingTime,
      {responseType: 'text'}
    );
  }

  delete(workingTimeId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/workingtime/${workingTimeId}`,
      {responseType: 'text'}
    );
  }
}
