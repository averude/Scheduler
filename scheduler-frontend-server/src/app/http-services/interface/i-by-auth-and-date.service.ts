import { Observable } from "rxjs";

export interface IByAuthAndDateService<T> {
  getAllByAuthAndDateBetween(from: string, to: string): Observable<T[]>;
}
