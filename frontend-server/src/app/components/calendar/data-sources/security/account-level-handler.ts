import { UserAccountDTO } from "../../../../model/dto/user-account-dto";
import { Observable } from "rxjs";
import { CalendarInitData } from "../../model/calendar-init-data";

export interface AccountLevelHandler {

  getInitialData(enterpriseId: number,
                 departmentId: number,
                 userAccount: UserAccountDTO): Observable<CalendarInitData>;

}

