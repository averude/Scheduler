import { Observable } from "rxjs";

export interface IByAuthAndDateService<T> {
  getAllByAuth(from: string, to: string): Observable<T[]>;
}
