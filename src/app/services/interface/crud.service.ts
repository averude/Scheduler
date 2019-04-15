import { Observable } from "rxjs";

export interface CrudService<T> {
  create(t: T): Observable<any>;
  update(t: T): Observable<any>;
  delete(id: number): Observable<any>;
}
