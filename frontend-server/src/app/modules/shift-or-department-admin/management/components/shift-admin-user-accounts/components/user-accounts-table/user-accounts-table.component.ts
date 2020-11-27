import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { UserAccount } from "../../../../../../../model/accounts/user-account";
import { Shift } from "../../../../../../../model/shift";
import { MatDialog } from "@angular/material/dialog";
import { UserAccountService } from "../../../../../../../services/http/user-account.service";
import { NotificationsService } from "angular2-notifications";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { Component } from "@angular/core";
import { UserAccountsDialogComponent } from "../user-accounts-dialog/user-accounts-dialog.component";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css', './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends TableBaseComponent<UserAccount> {

  displayedColumns = ['select', 'username', 'shift', 'role', 'locked', 'enabled', 'control'];

  shifts: Shift[] = [];

  constructor(dialog: MatDialog,
              userAccountService: UserAccountService,
              notificationsService: NotificationsService,
              private shiftService: ShiftService) {
    super(dialog, userAccountService, notificationsService);

    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);
  }

  openDialog(userAccount: UserAccount) {
    const data = {
      userAccount:  userAccount,
      shifts:  this.shifts
    };

    this.openAddOrEditDialog(userAccount, data, UserAccountsDialogComponent);
  }


  addOrEditDialogAfterCloseFunction(oldValue: UserAccount): (value: any) => void {
    return value => {
      if (!value) {
        return;
      }
      const observable = (<UserAccountService>this.crudService).createShiftAdmin(value);
      if (value.id) {
        observable.subscribe(this.onUpdated(value, oldValue));
      } else {
        observable.subscribe(this.onCreated(value));
      }
    };
  }

  removeEntity(entity: UserAccount): void {
    this.crudService.delete(entity.id).subscribe(res => {
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
