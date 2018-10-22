import { Injectable } from '@angular/core';
import { Schedule} from '../model/schedule';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  baseUrl = 'http://localhost:8080/scheduler/api/v1/schedule';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = {headers: this.headers};

  constructor(private http: HttpClient) { }

  getByDate(start: Date, end: Date, employeeId: number): Observable<Schedule[]> {
    const from = start.toISOString().split('T')[0];
    const to = end.toISOString().split('T')[0];
    return this.http.get<Schedule[]>(
      `${this.baseUrl}/employee/search?employeeId=${employeeId}&from=${from}&to=${to}`,
      this.options);
  }

  create(employeeId: number, schedule: Schedule[]): Observable<any> {
    return this.http.post<Schedule[]>(
      `${this.baseUrl}/${employeeId}`,
      schedule,
      this.options);
  }

  update(employeeId: number, schedule: Schedule[]): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${employeeId}`,
      schedule,
      this.options);
  }
}
