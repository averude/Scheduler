import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/http/department.service';
import { AuthService } from "../../../services/http/auth.service";
import { UserAccessRights } from "../../../model/user";
import { UserAccountService } from "../../../services/http/user-account.service";

@Component({
  selector: 'app-shift-or-department-admin',
  templateUrl: './shift-or-department-admin.component.html',
  styleUrls: ['./shift-or-department-admin.component.css']
})
export class ShiftOrDepartmentAdminComponent implements OnInit {

  userFullName: string;
  userAccessRights: UserAccessRights;

  constructor(private authService: AuthService,
              private userAccountService: UserAccountService,
              private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.userAccessRights = this.authService.currentUserValue.accessRights;

    this.userAccountService.current()
      .subscribe(userFullName => {
        if (!userFullName) {
          this.departmentService.getCurrent()
            .subscribe(department => this.userFullName = department.name)
        } else {
          this.userFullName = userFullName;
        }
      });
  }

  logout() {
    this.authService.logout();
  }
}
