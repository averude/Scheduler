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
      `${this.config.baseUrl}/daytypes`,
      this.config.options);
  }

  getById(dayTypeId: number): Observable<DayType> {
    return this.http.get<DayType>(
      `${this.config.baseUrl}/daytypes/${dayTypeId}`,
      this.config.options);
  }

  create(dayType: DayType): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/daytypes`,
      dayType,
      this.config.options);
  }

  update(dayType: DayType): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/daytypes/${dayType.id}`,
      dayType,
      this.config.options);
  }

  delete(dayTypeId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/daytypes/${dayTypeId}`,
      this.config.options);
  }
}
