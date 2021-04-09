import { Observable } from "rxjs";

export interface HasEnterpriseIdService<T> {
  getAllByEnterpriseId(enterpriseId: number, from?:string, to?:string): Observable<T[]>;
}
