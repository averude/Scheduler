import { Injectable } from "@angular/core";
import { RestConfig } from "../../rest.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CountDTO } from "../../model/dto/count-dto";
import { SummationDto, SummationMode } from "../../model/dto/summation-dto";

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

  getSummationDto(from: string, to: string): Observable<SummationDto[]> {
    return this.http.get<SummationDto[]>(
      `${this.config.baseUrl}/statistics/summation_columns/dates?from=${from}&to=${to}`
    );
  }

  getSummationDTO(from: string, to: string, type: SummationMode): Observable<SummationDto[]> {
    return this.http.get<SummationDto[]>(
      `${this.config.baseUrl}/statistics/summation_columns/${type}/dates?from=${from}&to=${to}`
    );
  }
}
