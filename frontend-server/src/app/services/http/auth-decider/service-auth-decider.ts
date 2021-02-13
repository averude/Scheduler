import { UserAccountAuthority, UserAccountDTO } from "../../../model/dto/new-user-account-dto";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ServiceAuthDecider {

  getAllByAuth<T>(service: ByAuthService<T>,
                  account: UserAccountDTO,
                  from?: string,
                  to?: string): Observable<T[]> {
    switch (account.authority) {
      case UserAccountAuthority.DEPARTMENT_ADMIN :
        return service.getAllByDepartmentId(account.departmentId, from, to);
      case UserAccountAuthority.SHIFT_ADMIN:
        return service.getAllByShiftIds(account.shiftIds, from, to);
      default: throw new Error('User doesn\'t have required authority');
    }
  }
}

export interface ByAuthService<T> {

  getAllByDepartmentId(departmentId: number,
                       from?: string,
                       to?: string): Observable<T[]>;

  getAllByShiftIds(shiftIds: number[],
                   from?: string,
                   to?: string): Observable<T[]>;
}
