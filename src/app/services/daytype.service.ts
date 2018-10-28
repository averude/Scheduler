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

  getInPattern(departmentId: number,
               patternId: number): Observable<DayType[]> {
    return this.http.get<DayType[]>(
      `${this.config.baseUrl}/${departmentId}/patterns/${patternId}/daytypes`,
      this.config.options
    );
  }

  create(departmentId: number,
         patternId: number,
         daytype: DayType): Observable<any> {
    return this.http.post(
      `${this.config.baseUrl}/${departmentId}/patterns/${patternId}/daytypes`,
      daytype,
      this.config.options
    );
  }

  update(departmentId: number,
         patternId: number,
         daytypeId: number,
         daytype: DayType): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/${departmentId}/patterns/${patternId}/daytypes/${daytypeId}`,
      daytype,
      this.config.options
    );
  }

  remove(departmentId: number,
         patternId: number,
         daytypeId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/${departmentId}/patterns/${patternId}/daytypes/${daytypeId}`,
      this.config.options
    );
  }
}
