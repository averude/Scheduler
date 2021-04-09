import { Observable } from "rxjs";

export interface HasDepartmentIdService<T> {
  getAllByDepartmentId(departmentId: number): Observable<T[]>;
}
