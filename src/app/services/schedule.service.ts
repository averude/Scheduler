import { Injectable } from '@angular/core';
import { WorkDay } from '../model/workday';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getByDate(start: string,
            end: string,
            employeeId: number): Observable<WorkDay[]> {
    return this.http.get<WorkDay[]>(
      `${this.config.baseUrl}/schedule/search?employeeId=${employeeId}&from=${start}&to=${end}`
    );
  }

  create(employeeId: number,
         schedule: WorkDay[]): Observable<any> {
    return this.http.post<any>(
      `${this.config.baseUrl}/schedule/${employeeId}`,
      schedule
    );
  }

  update(employeeId: number,
         schedule: WorkDay[]): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/schedule/${employeeId}`,
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
