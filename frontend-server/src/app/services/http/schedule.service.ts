import { Injectable } from '@angular/core';
import { WorkDay } from '../../model/workday';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../../rest.config';
import { GenerationDto } from "../../model/dto/generation-dto";
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
      `${this.config.baseUrl}/schedule/department/${departmentId}/dates?from=${from}&to=${to}`
    ).pipe(tap(dtos => dtos.forEach(dto => {
      dto.mainShiftCompositions.forEach(callbackFn);
      dto.substitutionShiftCompositions.forEach(callbackFn);
    })));
  }

  getAllByShiftIds(shiftIds: number[],
                   from: string,
                   to: string): Observable<EmployeeScheduleDTO[]> {
    return this.http.get<EmployeeScheduleDTO[]>(
      `${this.config.baseUrl}/schedule/shift/${shiftIds}/dates?from=${from}&to=${to}`
    ).pipe(tap(dtos => dtos.forEach(dto => {
      dto.mainShiftCompositions.forEach(callbackFn);
      dto.substitutionShiftCompositions.forEach(callbackFn);
    })));
  }

  create(schedule: WorkDay[]): Observable<any> {
    return this.http.post<any>(
      `${this.config.baseUrl}/schedule`,
      schedule
    );
  }

  update(schedule: WorkDay[]): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/schedule`,
      schedule,
      {responseType: 'text'}
    );
  }

  generate(generationDto: GenerationDto): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/schedule/generate`,
      generationDto,
      {responseType: 'text'}
    );
  }
}

const callbackFn = composition => {
  composition.from = moment.utc(composition.from);
  composition.to = moment.utc(composition.to);
};
