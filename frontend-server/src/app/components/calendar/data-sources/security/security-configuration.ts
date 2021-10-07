import { Injectable } from "@angular/core";
import { UserAccountDTO, UserAccountLevel } from "../../../../model/dto/user-account-dto";
import { ScheduleTableDataSource } from "../schedule-table.data-source";
import { AccountLevelHandler } from "./account-level-handler";
import { EnterpriseAccountLevelHandler } from "./enterprise-account-level-handler";
import { DepartmentAccountLevelHandler } from "./department-account-level-handler";
import { ShiftAccountLevelHandler } from "./shift-account-level-handler";

@Injectable()
export class SecurityConfiguration {

  private stateMap: Map<UserAccountLevel, AccountLevelHandler>;

  constructor(private dataSource: ScheduleTableDataSource) {
    this.stateMap = new Map<UserAccountLevel, AccountLevelHandler>();

    this.stateMap.set(UserAccountLevel.ENTERPRISE, new EnterpriseAccountLevelHandler(dataSource));
    this.stateMap.set(UserAccountLevel.DEPARTMENT, new DepartmentAccountLevelHandler(dataSource));
    this.stateMap.set(UserAccountLevel.SHIFT, new ShiftAccountLevelHandler(dataSource));
  }

  getHandler(userAccount: UserAccountDTO): AccountLevelHandler {
    return this.stateMap.get(userAccount.level);
  }
}
