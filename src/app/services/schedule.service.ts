import { Injectable } from '@angular/core';
import { WorkDay } from '../model/workday';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { ScheduleDto } from "../model/dto/schedule-dto";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getAllByDate(start: string,
               end: string): Observable<ScheduleDto[]> {
    return this.http.get<ScheduleDto[]>(
      `${this.config.baseUrl}/schedule/dates?from=${start}&to=${end}`
    )
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

  generate(shiftId: number,
           from: Date,
           to: Date,
           offset: number): Observable<any> {
    return this.http.post<any>(
      `${this.config.baseUrl}/schedule/generate?shiftId=${shiftId}&from=${from}&to=${to}&offset=${offset}`,
      null
    );
  }
}
