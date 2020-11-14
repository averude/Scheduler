import { Observable } from "rxjs";

export interface IByAuthService<T> {
  getAll(from?: string, to?: string): Observable<T[]>;
}
