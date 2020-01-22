import { Observable } from "rxjs";

export interface IByDateCrudService<T> {
  getAllByAuthAndDateBetween(from: string,
                             to: string): Observable<T[]>;

  getAllByDepartmentIdAndDateBetween(departmentId: number,
                                     from: string,
                                     to: string): Observable<T[]>;

  getAllByShiftIdAndDateBetween(shiftId: number,
                                from: string,
                                to: string): Observable<T[]>;
}
