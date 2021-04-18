import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../services/http/auth.service";
import { UserAccountAuthority, UserAccountDTO } from "../../model/dto/user-account-dto";
import { UserAccessRights } from "../../model/user";
import { SidePanelStepperComponent } from "../../lib/side-panel-stepper/side-panel-stepper.component";
import { DepartmentService } from "../../services/http/department.service";
import { Department } from "../../model/department";
import { EnterpriseService } from "../../services/http/enterprise.service";
import { Enterprise } from "../../model/enterprise";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  @ViewChild(SidePanelStepperComponent)
  stepper: SidePanelStepperComponent;

  @ViewChild(MatSidenav)
  side: MatSidenav;

  userAccount:  UserAccountDTO;
  accessRights: UserAccessRights;

  enterprise:   Enterprise;
  departments:  Department[];

  selectedDepartment: Department;
  orgLevelName: string;

  sideNavOpened: boolean;

  constructor(private authService: AuthService,
              private enterpriseService: EnterpriseService,
              private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.userAccount = this.authService.currentUserAccount;

    this.accessRights = this.authService.currentUserValue?.accessRights;
    this.sideNavOpened = this.accessRights?.isEnterpriseLevel;

    if (this.userAccount.authority === UserAccountAuthority.ENTERPRISE_ADMIN) {
      this.departmentService.getAllByEnterpriseId(this.userAccount.enterpriseId)
        .subscribe(departments => this.departments = departments);

      this.enterpriseService.getCurrent()
        .subscribe(enterprise => {
          this.enterprise = enterprise;
          this.orgLevelName = enterprise.name;
        });
    }

    if (this.userAccount.authority === UserAccountAuthority.DEPARTMENT_ADMIN
      || this.userAccount.authority === UserAccountAuthority.SHIFT_ADMIN) {
      this.departmentService.getById(this.userAccount.departmentIds[0])
        .subscribe(department => {
          this.selectedDepartment = department;
          this.orgLevelName = this.selectedDepartment.name;
        });
    }
  }

  logout() {
    this.authService.logout();
  }

  previousStep() {
    this.stepper.previous();
    this.orgLevelName = this.enterprise.name;
  }

  departmentStep(department: Department) {
    this.stepper.next();
    this.selectedDepartment = department;
    this.orgLevelName = department.name
  }
}
