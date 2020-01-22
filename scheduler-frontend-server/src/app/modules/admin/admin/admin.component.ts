import { Component, OnInit } from '@angular/core';
import { Department } from '../../../model/department';
import { DepartmentService } from '../../../services/department.service';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css',
    '../../../shared/common/toolbar.common.css']
})
export class AdminComponent implements OnInit {

  roles: string[];

  department: Department;

  constructor(
    private authService: AuthService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.departmentService.getCurrent()
      .subscribe(department => this.department = department);
    this.roles = this.authService.currentUserValue.roles;
  }

  logout() {
    this.authService.logout();
  }
}
