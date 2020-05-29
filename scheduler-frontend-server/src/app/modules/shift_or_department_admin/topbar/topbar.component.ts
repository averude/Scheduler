import { Component, OnInit } from '@angular/core';
import { Department } from '../../../model/department';
import { DepartmentService } from '../../../http-services/department.service';
import { AuthService } from "../../../http-services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css',
    '../../../shared/common/toolbar.common.css']
})
export class TopbarComponent implements OnInit {

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
