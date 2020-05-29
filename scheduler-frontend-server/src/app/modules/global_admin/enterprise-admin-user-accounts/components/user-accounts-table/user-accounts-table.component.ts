import { Component } from '@angular/core';
import { TableBaseComponent } from "../../../../../shared/abstract-components/table-base/table-base.component";
import { UserAccount } from "../../../../../model/accounts/user-account";
import { UserAccountService } from "../../../../../http-services/user-account.service";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { UserAccountsDialogComponent } from "../user-accounts-dialog/user-accounts-dialog.component";
import { EnterpriseService } from "../../../../../http-services/enterprise.service";
import { Enterprise } from "../../../../../model/enterprise";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends TableBaseComponent<UserAccount> {

  displayedColumns = ['select', 'username',
    'enterprise', 'locked', 'enabled', 'control'];

  enterprises: Enterprise[] = [];

  constructor(dialog: MatDialog,
              userAccountService: UserAccountService,
              notificationsService: NotificationsService,
              private enterpriseService: EnterpriseService) {
    super(dialog, userAccountService, notificationsService);

    this.enterpriseService.getAllByAuth()
      .subscribe(enterprises => this.enterprises = enterprises);
  }

  openDialog(userAccount: UserAccount) {
    const data = {
      userAccount:  userAccount,
      enterprises:  this.enterprises
    };

    this.openAddOrEditDialog(userAccount, data, UserAccountsDialogComponent);
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

  getEnterpriseById(id: number): Enterprise {
    return this.enterprises.find(value => value.id === id);
  }
}
