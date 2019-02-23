import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';
import { Observable } from 'rxjs';
import { DayType } from '../model/daytype';

@Injectable({
  providedIn: 'root'
})
export class DayTypeService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getAll(): Observable<DayType[]> {
    return this.http.get<DayType[]>(
      `${this.config.baseUrl}/admin/daytypes`
    );
  }

  getById(dayTypeId: number): Observable<DayType> {
    return this.http.get<DayType>(
      `${this.config.baseUrl}/admin/daytypes/${dayTypeId}`
    );
  }

  create(dayType: DayType): Observable<any> {
    return this.http.post<number>(
      `${this.config.baseUrl}/admin/daytypes`,
      dayType,
    );
  }

  update(dayType: DayType): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/daytypes/${dayType.id}`,
      dayType,
      {responseType: 'text'}
    );
  }

  delete(dayTypeId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/daytypes/${dayTypeId}`,
      {responseType: 'text'}
    );
  }
}
