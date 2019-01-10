import { Injectable } from '@angular/core';
import { WorkDay} from '../model/workday';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getByDate(start: Date,
            end: Date,
            employeeId: number): Observable<WorkDay[]> {
    const from = start.toISOString().split('T')[0];
    const to = end.toISOString().split('T')[0];
    return this.http.get<WorkDay[]>(
      `${this.config.baseUrl}/schedule/search?employeeId=${employeeId}&from=${from}&to=${to}`,
      this.config.options);
  }

  create(departmentId: number,
         employeeId: number,
         schedule: WorkDay[]): Observable<any> {
    return this.http.post<WorkDay[]>(
      `${this.config.baseUrl}/departments/${departmentId}/schedule/${employeeId}`,
      schedule,
      this.config.options);
  }

  update(departmentId: number,
         employeeId: number,
         schedule: WorkDay[]): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/departments/${departmentId}/schedule/${employeeId}`,
      schedule,
      this.config.options);
  }
}
