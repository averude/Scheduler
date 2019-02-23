import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestConfig {
  public baseUrl = 'http://192.168.1.102:8080/api/v1';
  public headers = new HttpHeaders(
    {
      'Content-Type': 'application/json;charset=UTF-8',
      'Department-ID': '1'
    }
    );
  public options = {headers: this.headers};
}
