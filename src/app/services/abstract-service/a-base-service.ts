import { Observable, of } from "rxjs";
import { AuthService } from "../auth.service";
import { ICrudService } from "../interface/crud.service";
import { IByAuthService } from "../interface/i-by-auth.service";

export abstract class ABaseService<T> implements ICrudService<T>, IByAuthService<T> {
  protected constructor(private authService: AuthService) {}

  getAllByAuth(): Observable<T[]> {
    let user = this.authService.currentUserValue;
    let result = of([]);
    if (user.roles.indexOf('GLOBAL_ADMIN') >= 0) {
      result = this.getAll();
    } else if (user.roles.indexOf('DEPARTMENT_ADMIN') >= 0) {
      result = this.getAllByDepartmentId(user.departmentId);
    } else if (user.roles.indexOf('SHIFT_ADMIN') >= 0) {
      result = this.getAllByShiftId(user.shiftId);
    }
    return result;
  }

  abstract getAll(): Observable<T[]>;

  abstract getAllByDepartmentId(departmentId: number): Observable<T[]>;

  abstract getAllByShiftId(shiftId: number): Observable<T[]>;
}
