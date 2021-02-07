import { UserAccountAuthority, UserAccountDTO } from "../../../../model/dto/new-user-account-dto";
import { Observable } from "rxjs";
import { ScheduleService } from "../../../http/schedule.service";
import { WorkingNormService } from "../../../http/working-norm.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleSourcesService {

  constructor(private scheduleService: ScheduleService,
              private workingNormService: WorkingNormService) {}

  getSourcesByUserAccount(from: string,
                          to: string,
                          userAccount: UserAccountDTO): Observable<any>[] {
    if (!userAccount || !userAccount.authority) {
      throw new Error("Empty user or authority");
    }

    let sources: Observable<any>[] = [];

    switch (userAccount.authority) {
      case UserAccountAuthority.DEPARTMENT_ADMIN : {
        sources = this.getDepartmentUserSources(from, to, userAccount);
        break;
      }

      case UserAccountAuthority.SHIFT_ADMIN : {
        sources = this.getShiftUserSources(from, to, userAccount);
        break;
      }

      default : {
        throw new Error('User doesn\'t have required authority');
      }
    }

    return sources;
  }

  getDepartmentUserSources(from: string,
                           to: string,
                           userAccount: UserAccountDTO): Observable<any>[] {
    return [
      this.scheduleService.getAllByDepartmentId(userAccount.departmentId, from, to),
      this.workingNormService.getAll(from, to)
    ];
  }

  getShiftUserSources(from: string,
                      to: string,
                      userAccount: UserAccountDTO): Observable<any>[] {
    return [
      this.scheduleService.getAllByShiftIds(userAccount.shiftIds, from, to),
      this.workingNormService.getAll(from, to)
    ];
  }

}
