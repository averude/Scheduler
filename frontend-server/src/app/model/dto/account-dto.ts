import { UserAccount } from "../accounts/user-account";
import { IdEntity } from "../interface/id-entity";

export class AccountDTO implements IdEntity{
  userAccount:  UserAccount;
  shiftIds:     number[];
  id: number;
}
