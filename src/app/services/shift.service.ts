import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from '../model/shift';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getAll(): Observable<Shift[]> {
    return this.http.get<Shift[]>(
      `${this.config.baseUrl}/admin/shifts`
    );
  }

  create(shift: Shift): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/shifts`,
      shift,
    );
  }

  update(shift: Shift): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/shifts`,
      shift,
      {responseType: 'text'}
    );
  }

  remove(shiftId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/shifts/${shiftId}`,
      {responseType: 'text'}
    );
  }
}
