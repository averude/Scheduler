import { Component } from '@angular/core';
import { TableBaseComponent } from "../../../../../shared/abstract-components/table-base/table-base.component";
import { UserAccount } from "../../../../../model/accounts/user-account";
import { UserAccountService } from "../../../../../services/http/user-account.service";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { UserAccountsDialogComponent } from "../user-accounts-dialog/user-accounts-dialog.component";
import { Department } from "../../../../../model/department";
import { DepartmentService } from "../../../../../services/http/department.service";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends TableBaseComponent<UserAccount> {

  displayedColumns = ['select', 'username',
    'department', 'locked', 'enabled', 'control'];

  departments: Department[] = [];

  constructor(dialog: MatDialog,
              userAccountService: UserAccountService,
              notificationsService: NotificationsService,
              private departmentService: DepartmentService) {
    super(dialog, userAccountService, notificationsService);

    this.departmentService.getAll()
      .subscribe(departments => this.departments = departments);
  }

  openDialog(userAccount: UserAccount) {
    const data = {
      userAccount:  userAccount,
      departments:  this.departments
    };

    this.openAddOrEditDialog(userAccount, data, UserAccountsDialogComponent);
  }


  addOrEditDialogAfterCloseFunction(oldValue: UserAccount): (value: any) => void {
    return value => {
      if (!value) {
        return;
      } else {
        return (<UserAccountService> this.crudService)
          .createDepartmentAdmin(value)
          .subscribe(this.onUpdated(value, oldValue));
      }
    };
  }

  removeEntity(entity: UserAccount): void {
    this.crudService.delete(entity.username).subscribe(res => {
      this.removeRow(entity);
      this.notification.success(
        'Deleted',
        'Selected values was successfully deleted'
      );
    });
  }

  getDepartmentById(id: number): Department {
    return this.departments.find(value => value.id === id);
  }
}
