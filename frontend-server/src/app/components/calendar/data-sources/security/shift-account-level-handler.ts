import { ScheduleTableDataSource } from "../schedule-table.data-source";
import { UserAccountDTO, UserAccountLevel } from "../../../../model/dto/user-account-dto";
import { Observable } from "rxjs";
import { AccountLevelHandler } from "./account-level-handler";
import { CalendarInitData } from "../../model/calendar-init-data";

export class ShiftAccountLevelHandler implements AccountLevelHandler {

  constructor(private dataSource: ScheduleTableDataSource) {
  }

  getInitialData(enterpriseId: number,
                 departmentId: number,
                 userAccount: UserAccountDTO): Observable<CalendarInitData> {
    if (userAccount.level === UserAccountLevel.SHIFT
      && userAccount.enterpriseId === enterpriseId
      && userAccount.departmentIds.indexOf(departmentId) >= 0) {

      return this.dataSource.byShiftIds(enterpriseId, departmentId, userAccount.shiftIds, userAccount.role);
    }
  }

}
