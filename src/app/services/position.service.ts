import { Injectable } from '@angular/core';
import { Position } from '../model/position';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RestConfig } from '../rest.config';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getAll(): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.config.baseUrl}/admin/positions`
    );
  }

  create(position: Position): Observable<any> {
     return this.http.post<number>(
       `${this.config.baseUrl}/admin/positions`,
       position,
     );
  }

  update(position: Position): Observable<any> {
    return this.http.put(
      `${this.config.baseUrl}/admin/positions`,
      position,
      {responseType: 'text'}
    );
  }

  remove(positionId: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/positions/${positionId}`,
      {responseType: 'text'}
    );
  }
}
