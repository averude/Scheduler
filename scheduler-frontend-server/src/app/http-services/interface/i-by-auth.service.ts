import { Observable } from "rxjs";

export interface IByAuthService<T> {
  getAllByAuth(): Observable<T[]>;
}
