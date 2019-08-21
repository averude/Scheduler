import { Injectable } from "@angular/core";
import { RestConfig } from "../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Holiday } from "../model/holiday";
import { parseDateOfEntities } from "../shared/utils/utils";
import { PageableByDateCrudService } from "./interface/pageable-by-date-crud.service";

@Injectable({
  providedIn: "root"
})
export class HolidayService implements PageableByDateCrudService<Holiday> {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getAll(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(
      `${this.config.baseUrl}/admin/holidays`
    ).pipe(parseDateOfEntities);
  }

  getAllByDate(from: string, to: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(
      `${this.config.baseUrl}/admin/holidays/search?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
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

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/holidays/${id}`,
      {responseType: 'text'}
    );
  }
}
