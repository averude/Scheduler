import { Injectable } from "@angular/core";
import { RestConfig } from "../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CountDTO } from "../model/count-dto";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  constructor(private http: HttpClient,
              private config: RestConfig) {}

  getNumberOfEmployeesInPositions(): Observable<CountDTO[]> {
    return this.http.get<CountDTO[]>(
      `${this.config.baseUrl}/statistics/positions/employees`
    );
  }
}
