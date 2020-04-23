import { Observable } from "rxjs";

export interface IByDateCrudService<T> {
  getAllByAuth(from: string,
               to: string): Observable<T[]>;

  getAllByDepartmentId(departmentId: number,
                       from: string,
                       to: string): Observable<T[]>;

  getAllByShiftId(shiftId: number,
                  from: string,
                  to: string): Observable<T[]>;
}
