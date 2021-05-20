import { Injectable } from '@angular/core';
import { WorkDay } from '../../model/workday';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { EmployeeScheduleDTO } from "../../model/dto/employee-schedule-dto";
import { tap } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getAllByDepartmentId(departmentId: number,
                       from: string,
                       to: string): Observable<EmployeeScheduleDTO[]> {
    return this.http.get<EmployeeScheduleDTO[]>(
      `${this.config.baseUrl}/work_schedule/departments/${departmentId}?from=${from}&to=${to}`
    ).pipe(tap(dtos => dtos.forEach(dto => {
      dto.mainCompositions.forEach(convertDateStringToMoment);
      dto.substitutionCompositions.forEach(convertDateStringToMoment);
    })));
  }

  getAllByShiftIds(shiftIds: number[],
                   from: string,
                   to: string): Observable<EmployeeScheduleDTO[]> {
    return this.http.get<EmployeeScheduleDTO[]>(
      `${this.config.baseUrl}/work_schedule/shifts/${shiftIds}?from=${from}&to=${to}`
    ).pipe(tap(dtos => dtos.forEach(dto => {
      dto.mainCompositions.forEach(convertDateStringToMoment);
      dto.substitutionCompositions.forEach(convertDateStringToMoment);
    })));
  }

  getAllByViewId(viewId: number,
                 from: string,
                 to: string): Observable<EmployeeScheduleDTO[]> {
    return this.http.get<EmployeeScheduleDTO[]>(
      `${this.config.baseUrl}/work_schedule/views/${viewId}?from=${from}&to=${to}`
    );
  }

  create(schedule: WorkDay[]): Observable<any> {
    return this.http.post<any>(
      `${this.config.baseUrl}/work_schedule`,
      schedule
    );
  }

  update(schedule: WorkDay[]): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/work_schedule`,
      schedule,
      {responseType: 'text'}
    );
  }
}

export const convertDateStringToMoment = hasDateInterval => {
  hasDateInterval.from = moment.utc(hasDateInterval.from);
  hasDateInterval.to = moment.utc(hasDateInterval.to);
  return hasDateInterval;
};
