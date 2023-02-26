import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CalendarDataDTO } from "../../../model/dto/united/calendar-data-dto";
import { convertDateStringToMoment } from "../schedule.service";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../../../rest.config";

@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {

  constructor(private httpClient: HttpClient,
              private config: RestConfig) {}

  getByEnterpriseIdAndDepartmentIdAndDate(enterpriseId: number,
                                          departmentId: number,
                                          startDate: string,
                                          endDate: string): Observable<CalendarDataDTO> {
    return this.httpClient.get<CalendarDataDTO>(
      `${this.config.baseUrl}/enterprises/${enterpriseId}/departments/${departmentId}
      /calendar_data?from=${startDate}&to=${endDate}`
    ).pipe(tap(value => value.schedule.forEach(dto => {
      dto.mainCompositions.forEach(convertDateStringToMoment);
      dto.substitutionCompositions.forEach(convertDateStringToMoment);
    })));
  }

  getByEnterpriseIdAndDepartmentIdAndShiftIdsAndDate(enterpriseId: number,
                                                     departmentId: number,
                                                     shiftIds: number[],
                                                     startDate: string,
                                                     endDate: string): Observable<CalendarDataDTO> {
    return this.httpClient.get<CalendarDataDTO>(
      `${this.config.baseUrl}/enterprises/${enterpriseId}/departments/${departmentId}/shifts/${shiftIds}
      /calendar_data?from=${startDate}&to=${endDate}`
    ).pipe(tap(value => value.schedule.forEach(dto => {
      dto.mainCompositions.forEach(convertDateStringToMoment);
      dto.substitutionCompositions.forEach(convertDateStringToMoment);
    })));
  }

}
