import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ICrudService } from "../interface/crud.service";
import { IByAuthService } from "../interface/i-by-auth.service";
import { CUDService } from "../interface/cud-service";
import { IByDateCrudService } from "../interface/by-date-crud.service";
import { IByAuthAndDateService } from "../interface/i-by-auth-and-date.service";
import { IByEnterpriseIdService } from "../interface/i-by-enterprise-id.service";

export abstract class ACrudService<T>
  implements ICrudService<T>, IByDateCrudService<T>, IByAuthService<T>,
    IByAuthAndDateService<T>, IByEnterpriseIdService<T>, CUDService<T> {

  protected constructor(protected url: string,
                        protected http: HttpClient) {}

  getAllByAuth(from?: string, to?: string): Observable<T[]> {
    return this.getAll(from, to);
  }

  getAll(from?: string, to?: string): Observable<T[]> {
    let path = `${this.url}${this.getExtraDateUrl(from, to)}`;
    return this.http.get<T[]>(path);
  }

  getAllByEnterpriseId(enterpriseId: number, from?: string, to?: string): Observable<T[]> {
    let path = `${this.url}/enterprises/${enterpriseId}${this.getExtraDateUrl(from, to)}`;
    return this.http.get<T[]>(path);
  }

  getAllByDepartmentId(departmentId: number, from?: string, to?: string): Observable<T[]> {
    let path = `${this.url}/departments/${departmentId}${this.getExtraDateUrl(from, to)}`;
    return this.http.get<T[]>(path);
  }

  getAllByShiftId(shiftId: number, from?: string, to?: string): Observable<T[]> {
    let path = `${this.url}/shifts/${shiftId}${this.getExtraDateUrl(from, to)}`;
    return this.http.get<T[]>(path);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  create(t: T): Observable<any> {
    return this.http.post<number>(`${this.url}`, t);
  }

  update(t: T): Observable<any> {
    return this.http.put(`${this.url}`, t, {responseType: 'text'});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  protected getExtraDateUrl(from: string, to: string): string {
    return (from && to) ? `/dates?from=${from}&to=${to}` : '';
  }
}
