import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { IByDateCrudService } from "../interface/by-date-crud.service";
import { IByAuthAndDateService } from "../interface/i-by-auth-and-date.service";

export abstract class APageableByDateService<T> implements IByDateCrudService<T>, IByAuthAndDateService<T> {

  protected constructor(private authService: AuthService) {}

  getAllByAuthAndDateBetween(from: string, to: string): Observable<T[]> {
    let user = this.authService.currentUserValue;
    if (user.roles.indexOf('DEPARTMENT_ADMIN') >= 0) {
      return this.getAllByDepartmentIdAndDateBetween(user.departmentId, from, to);
    } else if (user.roles.indexOf('SHIFT_ADMIN') >= 0) {
      return this.getAllByShiftIdAndDateBetween(user.shiftId, from, to);
    }
  }

  abstract getAllByDepartmentIdAndDateBetween(departmentId: number,
                                              from: string,
                                              to: string): Observable<T[]>;

  abstract getAllByShiftIdAndDateBetween(shiftId: number,
                                         from: string,
                                         to: string): Observable<T[]>;
}
