import { Component } from '@angular/core';
import { TableBaseIdEntityComponent } from "../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { EnterpriseService } from "../../../../../services/http/enterprise.service";
import { Enterprise } from "../../../../../model/enterprise";
import { EnterpriseUserAccountService } from "../../../../../services/http/auth/enterprise-user-account.service";
import { UserAccountDTO } from "../../../../../model/dto/user-account-dto";
import { AddEnterpriseUserAccountDialogComponent } from "../add-enterprise-user-account-dialog/add-enterprise-user-account-dialog.component";
import { EditEnterpriseUserAccountDialogComponent } from "../edit-enterprise-user-account-dialog/edit-enterprise-user-account-dialog.component";
import { ResetUserAccountPasswordDialogComponent } from "../../../../reset-user-account-password-dialog/reset-user-account-password-dialog.component";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends TableBaseIdEntityComponent<UserAccountDTO> {

  displayedColumns = ['select', 'username', 'name', 'enterprise', 'role', 'resetPass', 'control'];

  enterprises: Enterprise[] = [];
  enterpriseMap: Map<number, Enterprise>;

  constructor(dialog: MatDialog,
              userAccountService: EnterpriseUserAccountService,
              notificationsService: NotificationsService,
              private enterpriseService: EnterpriseService) {
    super(dialog, userAccountService, notificationsService);

    this.enterpriseService.getAll()
      .subscribe(enterprises => {
        this.enterpriseMap = new Map<number, Enterprise>();
        enterprises.forEach(enterprise => this.enterpriseMap.set(enterprise.id, enterprise));
        this.enterprises = enterprises.sort((a, b) => a.id - b.id);
      });
  }

  openDialog(t: UserAccountDTO) {
  }

  openAddDialog() {
    const data = {
      enterprises: this.enterprises
    };

    this.openAddOrEditDialog(null, data, AddEnterpriseUserAccountDialogComponent);
  }

  openEditDialog(userAccountDTO: UserAccountDTO) {
    const data = {
      dto: userAccountDTO,
      enterprises: this.enterprises
    };

    this.openAddOrEditDialog(userAccountDTO, data, EditEnterpriseUserAccountDialogComponent);
  }

  openResetPassDialog(userAccountDTO: UserAccountDTO) {
    const data = {
      dto: userAccountDTO,
    };

    this.matDialog.open(ResetUserAccountPasswordDialogComponent, {data: data})
      .afterClosed()
      .subscribe(passwordResetDTO => {
        if (passwordResetDTO) {
          const crudService = <EnterpriseUserAccountService> this.crudService;
          crudService.resetPassword(userAccountDTO.id, passwordResetDTO)
            .subscribe(res => this.notification
              .success(`Password of ${userAccountDTO.username} successfully reset`));
        }
      })
  }

  onUpdated(value: UserAccountDTO, oldValue: UserAccountDTO): (value: any) => void {
    return res => {
      this.updateRow(res, oldValue);
      this.notification
        .success(
          'Updated',
          `User account was successfully updated`);
    }
  }

  onCreated(value: UserAccountDTO): (value: any) => void {
    return res => {
      value = res;
      this.addRow(value);
      this.notification
        .success(
          'Created',
          `User account was successfully created`)
    }
  }

  getEnterpriseById(id: number): Enterprise {
    return this.enterpriseMap.get(id);
  }
}
