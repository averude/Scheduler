import { ScheduleTableDataSource } from "../schedule-table.data-source";
import { UserAccountDTO, UserAccountLevel } from "../../../../model/dto/user-account-dto";
import { Observable } from "rxjs";
import { InitialData } from "../../../../model/datasource/initial-data";
import { AccountLevelHandler } from "./account-level-handler";

export class ShiftAccountLevelHandler implements AccountLevelHandler {

  constructor(private dataSource: ScheduleTableDataSource) {
  }

  getInitialData(enterpriseId: number,
                 departmentId: number,
                 userAccount: UserAccountDTO): Observable<InitialData> {
    if (userAccount.level === UserAccountLevel.SHIFT
      && userAccount.enterpriseId === enterpriseId
      && userAccount.departmentIds.indexOf(departmentId) >= 0) {

      return this.dataSource.byShiftIds(enterpriseId, departmentId, userAccount.shiftIds, userAccount.role);
    }
  }

}
