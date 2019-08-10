import { Component, OnInit } from '@angular/core';
import { Department } from '../../../model/department';
import { DepartmentService } from '../../../services/department.service';
import { AuthService } from "../../../services/auth.service";
import { DepartmentIconService } from "../../../services/department-icon.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  roles: string[];

  department: Department;
  departmentIcon: any;

  constructor(
    private authService: AuthService,
    private departmentService: DepartmentService,
    private departmentIconService: DepartmentIconService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.departmentService.getCurrent()
      .subscribe(department => {
        this.department = department;
        if (department.iconId) {
          this.departmentIconService.getFileById(department.iconId)
            .subscribe(icon => this.convertToImage(icon));
        }
      });
    this.roles = this.authService.currentUserValue.roles;
  }

  convertToImage(icon: Blob) {
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      this.departmentIcon = this.sanitizer.bypassSecurityTrustUrl(reader.result.toString());
    }, false);

    if (icon) {
      reader.readAsDataURL(icon);
    }
  }

  logout() {
    this.authService.logout();
  }
}
