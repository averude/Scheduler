import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestConfig {
  public baseUrl = 'http://localhost:8080/scheduler/api/v1/';
  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public options = {headers: this.headers};
}
