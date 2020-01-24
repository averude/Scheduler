import { Observable } from "rxjs";

export interface CUDService<T> {
  create(t: T): Observable<any>;
  update(t: T): Observable<any>;
  delete(id: number): Observable<any>;
}
