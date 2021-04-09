import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CUDService } from "../interface/cud-service";

export abstract class ACrudService<T>
  implements CUDService<T> {

  protected constructor(protected url: string,
                        protected http: HttpClient) {}

  getAll(from?: string, to?: string): Observable<T[]> {
    let path = `${this.url}${this.getExtraDateUrl(from, to)}`;
    return this.http.get<T[]>(path);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  create(t: T): Observable<T> {
    return this.http.post<T>(`${this.url}`, t);
  }

  update(t: T): Observable<T> {
    return this.http.put<T>(`${this.url}`, t);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  protected getExtraDateUrl(from: string, to: string): string {
    return (from && to) ? `/dates?from=${from}&to=${to}` : '';
  }
}
