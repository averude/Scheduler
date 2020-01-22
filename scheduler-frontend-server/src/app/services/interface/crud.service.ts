import { Observable } from "rxjs";

export interface ICrudService<T> {
  getAll(): Observable<T[]>;
  getAllByDepartmentId(departmentId: number): Observable<T[]>;
  getAllByShiftId(shiftId: number): Observable<T[]>;
}
