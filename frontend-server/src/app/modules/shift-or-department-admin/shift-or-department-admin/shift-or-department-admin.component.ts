import { Component, OnInit } from '@angular/core';
import { Department } from '../../../model/department';
import { DepartmentService } from '../../../services/http/department.service';
import { AuthService } from "../../../services/http/auth.service";
import { UserAccessRights } from "../../../model/user";

@Component({
  selector: 'app-shift-or-department-admin',
  templateUrl: './shift-or-department-admin.component.html',
  styleUrls: ['./shift-or-department-admin.component.css']
})
export class ShiftOrDepartmentAdminComponent implements OnInit {

  userAccessRights: UserAccessRights;
  department: Department;

  constructor(private authService: AuthService,
              private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.userAccessRights = this.authService.currentUserValue.accessRights;
    this.departmentService.getCurrent()
      .subscribe(department => this.department = department);
  }

  logout() {
    this.authService.logout();
  }
}
