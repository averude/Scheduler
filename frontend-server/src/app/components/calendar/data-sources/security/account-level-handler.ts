import { UserAccountDTO } from "../../../../model/dto/user-account-dto";
import { Observable } from "rxjs";
import { InitialData } from "../../../../model/datasource/initial-data";

export interface AccountLevelHandler {

  getInitialData(enterpriseId: number,
                 departmentId: number,
                 userAccount: UserAccountDTO): Observable<InitialData>;

}

