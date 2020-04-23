import { Observable } from "rxjs";

export interface IByEnterpriseIdService<T> {
  getAllByEnterpriseId(enterpriseId: number): Observable<T[]>;
}
