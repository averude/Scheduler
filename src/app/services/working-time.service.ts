import { Injectable } from "@angular/core";
import { RestConfig } from "../rest.config";
import { Observable } from "rxjs";
import { WorkingTime } from "../model/working-time";
import { HttpClient } from "@angular/common/http";
import { CrudService } from "./interface/crud.service";

@Injectable({
  providedIn: "root"
})
export class WorkingTimeService implements CrudService<WorkingTime> {

  constructor(private config: RestConfig,
              private http: HttpClient) {}

  getAll(): Observable<WorkingTime[]> {
    return this.http.get<WorkingTime[]>(
      `${this.config.baseUrl}/admin/workingtime`
    );
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
