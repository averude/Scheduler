import { HttpClient } from "@angular/common/http";
import { RestConfig } from "../rest.config";
import { Observable } from "rxjs";
import { DepartmentIcon } from "../model/department-icon";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DepartmentIconService {

  constructor(private http: HttpClient,
              private config: RestConfig) { }

  getAll(): Observable<DepartmentIcon[]> {
    return this.http.get<DepartmentIcon[]>(
      `${this.config.baseUrl}/admin/icons`
    );
  }

  getFileById(id: number): Observable<Blob> {
    return this.http.get(
      `${this.config.baseUrl}/admin/icons/${id}/file`,
      {responseType: 'blob'}
    );
  }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      `${this.config.baseUrl}/admin/icons/upload`,
      formData,
      {
        reportProgress: true,
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.config.baseUrl}/admin/icons/${id}`
    )
  }
}
