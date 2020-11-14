import { Component, OnInit } from '@angular/core';
import { Department } from '../../../model/department';
import { DepartmentService } from '../../../services/http/department.service';
import { AuthService } from "../../../services/http/auth.service";

@Component({
  selector: 'app-shift-or-department-admin',
  templateUrl: './shift-or-department-admin.component.html',
  styleUrls: ['./shift-or-department-admin.component.css']
})
export class ShiftOrDepartmentAdminComponent implements OnInit {

  isAdmin:  boolean;
  roles:    string[];
  department: Department;

  constructor(private authService: AuthService,
              private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.getCurrent()
      .subscribe(department => this.department = department);
    this.isAdmin = this.authService.isAdmin();
    this.roles = this.authService.currentUserValue.roles;
  }

  logout() {
    this.authService.logout();
  }
}
