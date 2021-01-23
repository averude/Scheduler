import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { Shift } from "../../../../../../../model/shift";
import { MatDialog } from "@angular/material/dialog";
import { UserAccountService } from "../../../../../../../services/http/user-account.service";
import { NotificationsService } from "angular2-notifications";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { Component } from "@angular/core";
import { UserAccountsDialogComponent } from "../user-accounts-dialog/user-accounts-dialog.component";
import { AccountDTO } from "../../../../../../../model/dto/account-dto";
import { CUDService } from "../../../../../../../services/http/interface/cud-service";
import { Observable } from "rxjs";
import { IByAuthService } from "../../../../../../../services/http/interface/i-by-auth.service";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css', './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends TableBaseComponent<AccountDTO> {

  displayedColumns = ['select', 'username', 'name', 'shift', 'role', 'locked', 'enabled', 'control'];

  shifts: Shift[] = [];

  constructor(dialog: MatDialog,
              private userAccountService: UserAccountService,
              notificationsService: NotificationsService,
              private shiftService: ShiftService) {
    super(dialog, new AccountDTOServiceAdapter(userAccountService), notificationsService);

    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);
  }

  openDialog(userAccount: AccountDTO) {
    const data = {
      userAccount:  userAccount,
      shifts:  this.shifts
    };

    this.openAddOrEditDialog(userAccount, data, UserAccountsDialogComponent);
  }


  addOrEditDialogAfterCloseFunction(oldValue: AccountDTO): (value: AccountDTO) => void {
    return value => {
      if (!value) {
        return;
      }
      const observable = (this.crudService).create(value);
      if (value.userAccount.id) {
        observable.subscribe(this.onUpdated(value, oldValue));
      } else {
        observable.subscribe(this.onCreated(value));
      }
    };
  }

  removeEntity(entity: AccountDTO): void {
    this.crudService.delete(entity.userAccount.id).subscribe(res => {
      this.removeRow(entity);
      this.notification.success(
        'Deleted',
        'Selected values was successfully deleted'
      );
    });
  }

  getShiftById(id: number): Shift {
    return this.shifts.find(value => value.id === id);
  }
}

class AccountDTOServiceAdapter implements CUDService<AccountDTO>, IByAuthService<AccountDTO> {

  constructor(private userAccountService: UserAccountService) {}

  getAll(from?: string, to?: string): Observable<AccountDTO[]> {
    return this.userAccountService.getAllShiftUsers();
  }

  create(t: AccountDTO): Observable<number> {
    return this.userAccountService.createShiftAdmin(t);
  }

  update(t: AccountDTO): Observable<any> {
    return this.userAccountService.updateShiftAdmin(t);
  }

  delete(id: any): Observable<any> {
    return this.userAccountService.delete(id);
  }
}
