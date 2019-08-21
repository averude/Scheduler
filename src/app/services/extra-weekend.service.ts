import { Injectable } from "@angular/core";
import { ExtraWeekend } from "../model/extra-weekend";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { parseDateOfEntities } from "../shared/utils/utils";
import { PageableByDateCrudService } from "./interface/pageable-by-date-crud.service";

@Injectable({
  providedIn: "root"
})
export class ExtraWeekendService implements PageableByDateCrudService<ExtraWeekend> {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getAll(): Observable<ExtraWeekend[]> {
    return this.http.get<ExtraWeekend[]>(
      `${this.config.baseUrl}/admin/extraweekends`
    ).pipe(parseDateOfEntities);
  }

  getAllByDate(from: string, to: string): Observable<ExtraWeekend[]> {
    return this.http.get<ExtraWeekend[]>(
      `${this.config.baseUrl}/admin/extraweekends/search?from=${from}&to=${to}`
    ).pipe(parseDateOfEntities);
  }

  create(extraWeekend: ExtraWeekend): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/extraweekends`,
      extraWeekend,
    );
  }

  update(extraWeekend: ExtraWeekend): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/extraweekends`,
      extraWeekend,
      {responseType: 'text'}
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/extraweekends/${id}`,
      {responseType: 'text'}
    );
  }
}
