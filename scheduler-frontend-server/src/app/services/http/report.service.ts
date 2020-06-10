import { Injectable } from '@angular/core';
import { RestConfig } from "../../rest.config";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private config: RestConfig,
              private http: HttpClient) { }

  getReport(from: string,
            to: string): Observable<HttpResponse<Blob>> {
    return this.http.get(
      `${this.config.baseUrl}/reports?from=${from}&to=${to}`,
      { observe: 'response', responseType: 'blob' }
    );
  }
}
