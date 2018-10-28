import { Injectable } from '@angular/core';
import { Schedule} from '../model/schedule';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getByDate(start: Date, end: Date, employeeId: number): Observable<Schedule[]> {
    const from = start.toISOString().split('T')[0];
    const to = end.toISOString().split('T')[0];
    return this.http.get<Schedule[]>(
      `${this.config.baseUrl}/employee/search?employeeId=${employeeId}&from=${from}&to=${to}`,
      this.config.options);
  }

  create(employeeId: number, schedule: Schedule[]): Observable<any> {
    return this.http.post<Schedule[]>(
      `${this.config.baseUrl}/${employeeId}`,
      schedule,
      this.config.options);
  }

  update(employeeId: number, schedule: Schedule[]): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/${employeeId}`,
      schedule,
      this.config.options);
  }
}
