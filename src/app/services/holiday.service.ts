import { Injectable } from "@angular/core";
import { RestConfig } from "../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Holiday } from "../model/holiday";
import { CrudService } from "./interface/crud.service";

@Injectable({
  providedIn: "root"
})
export class HolidayService implements CrudService<Holiday> {
  constructor(private config: RestConfig,
              private http: HttpClient) {}

  getAll(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(
      `${this.config.baseUrl}/admin/holidays`
    );
  }

  create(holiday: Holiday): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/holidays`,
      holiday,
    );
  }

  update(holiday: Holiday): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/holidays`,
      holiday,
      {responseType: 'text'}
    );
  }

  delete(holidayId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/holidays/${holidayId}`,
      {responseType: 'text'}
    );
  }
}
