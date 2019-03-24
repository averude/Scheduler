import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../../../model/department';
import { DepartmentService } from '../../../services/department.service';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  department$: Observable<Department>;

  constructor(
    private authService: AuthService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.department$ = this.departmentService.getCurrent();
  }

  logout() {
    this.authService.logout();
  }
}
