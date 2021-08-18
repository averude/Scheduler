import { Component } from '@angular/core';
import { HasEnterpriseTableComponent } from "../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { Department } from "../../../../../model/department";
import { DepartmentService } from "../../../../../services/http/department.service";
import { DepartmentUserAccountService } from "../../../../../services/http/auth/department-user-account.service";
import { UserAccountDTO } from "../../../../../model/dto/user-account-dto";
import { AddDepartmentUserAccountDialogComponent } from "../add-department-user-account-dialog/add-department-user-account-dialog.component";
import { EditDepartmentUserAccountDialogComponent } from "../edit-department-user-account-dialog/edit-department-user-account-dialog.component";
import { ResetUserAccountPasswordDialogComponent } from "../../../../reset-user-account-password-dialog/reset-user-account-password-dialog.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends HasEnterpriseTableComponent<UserAccountDTO> {

  displayedColumns = ['select', 'username', 'name', 'departments', 'role', 'resetPass', 'control'];

  departments: Department[] = [];
  departmentMap: Map<number, Department>;

  constructor(dialog: MatDialog,
              departmentUserAccountService: DepartmentUserAccountService,
              notificationsService: NotificationsService,
              private departmentService: DepartmentService,
              private activatedRoute: ActivatedRoute) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.enterpriseId),
      departmentUserAccountService, notificationsService);

    this.departmentService.getAllByEnterpriseId(this.enterpriseId)
      .subscribe(departments => {
        this.departmentMap = new Map<number, Department>();
        departments.forEach(department => this.departmentMap.set(department.id, department));
        this.departments = departments.sort((a, b) => a.id - b.id)
      });
  }

  openDialog(t: UserAccountDTO) {
  }

  openAddDialog() {
    const data = {
      departments: this.departments,
      enterpriseId: this.enterpriseId
    };

    this.openAddOrEditDialog(null, data, AddDepartmentUserAccountDialogComponent);
  }

  openEditDialog(userAccountDTO: UserAccountDTO) {
    const data = {
      dto: userAccountDTO,
      departments: this.departments,
      enterpriseId: this.enterpriseId
    };

    this.openAddOrEditDialog(userAccountDTO, data, EditDepartmentUserAccountDialogComponent);
  }

  openResetPassDialog(userAccountDTO: UserAccountDTO) {
    const data = {
      dto: userAccountDTO,
    };

    this.matDialog.open(ResetUserAccountPasswordDialogComponent, {data: data})
      .afterClosed()
      .subscribe(passwordResetDTO => {
        if (passwordResetDTO) {
          const crudService = <DepartmentUserAccountService> this.crudService;
          crudService.resetPassword(userAccountDTO.id, passwordResetDTO)
            .subscribe(res => this.notification
              .success(`Password of ${userAccountDTO.username} successfully reset`));
        }
      })
  }

  getDepartmentByIds(ids: number[]): string {
    if (ids && ids.length > 0) {
      return ids.sort()
        .map((id, index) => {
          const department = this.departmentMap.get(id);
          if (department) {
            return `${department.name}${index < ids.length - 1 ? ', ' : ''}`
          }
        })
        .reduce(((previousValue, currentValue) => previousValue?.concat(currentValue)));
    }
  }
}
