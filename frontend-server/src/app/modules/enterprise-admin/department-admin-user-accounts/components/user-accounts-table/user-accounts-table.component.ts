import { Component } from '@angular/core';
import { TableBaseIdEntityComponent } from "../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { Department } from "../../../../../model/department";
import { DepartmentService } from "../../../../../services/http/department.service";
import { DepartmentUserAccountService } from "../../../../../services/http/auth/department-user-account.service";
import { UserAccountDTO } from "../../../../../model/dto/new-user-account-dto";
import { binarySearch } from "../../../../../shared/utils/collection-utils";
import { AddDepartmentUserAccountDialogComponent } from "../add-department-user-account-dialog/add-department-user-account-dialog.component";
import { EditDepartmentUserAccountDialogComponent } from "../edit-department-user-account-dialog/edit-department-user-account-dialog.component";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends TableBaseIdEntityComponent<UserAccountDTO> {

  displayedColumns = ['select', 'username', 'name', 'department', 'role', 'control'];

  departments: Department[] = [];

  constructor(dialog: MatDialog,
              departmentUserAccountService: DepartmentUserAccountService,
              notificationsService: NotificationsService,
              private departmentService: DepartmentService) {
    super(dialog, departmentUserAccountService, notificationsService);

    this.departmentService.getAll()
      .subscribe(departments => this.departments = departments.sort((a, b) => a.id - b.id));
  }

  openDialog(t: UserAccountDTO) {
  }

  openAddDialog() {
    const data = {
      departments: this.departments
    };

    this.openAddOrEditDialog(null, data, AddDepartmentUserAccountDialogComponent);
  }

  openEditDialog(userAccountDTO: UserAccountDTO) {
    const data = {
      dto: userAccountDTO,
      departments: this.departments
    };

    this.openAddOrEditDialog(userAccountDTO, data, EditDepartmentUserAccountDialogComponent);
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

  getDepartmentById(id: number): Department {
    return binarySearch(this.departments, (mid => mid.id - id));
  }
}
