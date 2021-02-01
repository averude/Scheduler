import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/http/department.service';
import { AuthService } from "../../../services/http/auth.service";
import { UserAccessRights } from "../../../model/user";
import { UserAccountService } from "../../../services/http/user-account.service";
import { Department } from "../../../model/department";
import { MatDialog } from "@angular/material/dialog";
import { ChangeUserAccountPasswordDialogComponent } from "../change-user-account-password-dialog/change-user-account-password-dialog.component";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-shift-or-department-admin',
  templateUrl: './shift-or-department-admin.component.html',
  styleUrls: ['./shift-or-department-admin.component.css']
})
export class ShiftOrDepartmentAdminComponent implements OnInit {

  userFullName: string;
  department: Department;
  userAccessRights: UserAccessRights;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private userAccountService: UserAccountService,
              private departmentService: DepartmentService,
              private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.userAccessRights = this.authService.currentUserValue.accessRights;

    this.departmentService.getCurrent()
      .subscribe(department => this.department = department);

    this.userAccountService.me()
      .subscribe(userAccountDTO => this.userFullName = userAccountDTO.name);
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangeUserAccountPasswordDialogComponent)
      .afterClosed()
      .subscribe(passwordChangeDTO => {
        if (passwordChangeDTO) {
          this.userAccountService.changePassword(passwordChangeDTO)
            .subscribe(res => this.notificationsService.success("Password changed"));
        }
      });
  }

  logout() {
    this.authService.logout();
  }
}
