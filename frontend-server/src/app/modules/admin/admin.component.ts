import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../services/http/auth.service";
import { UserAccountDTO, UserAccountLevel } from "../../model/dto/user-account-dto";
import { UserAccessRights } from "../../model/user";
import { SidePanelStepperComponent } from "../../lib/side-panel-stepper/side-panel-stepper.component";
import { DepartmentService } from "../../services/http/department.service";
import { Department } from "../../model/department";
import { EnterpriseService } from "../../services/http/enterprise.service";
import { Enterprise } from "../../model/enterprise";
import { MatSidenav } from "@angular/material/sidenav";
import { WorkScheduleViewDTOService } from "../../services/http/work-schedule-view-dto.service";
import { WorkScheduleView } from "../../model/work-schedule-view";
import { PaginationService } from "../../shared/paginators/pagination.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {

  @ViewChild(SidePanelStepperComponent)
  stepper: SidePanelStepperComponent;

  @ViewChild(MatSidenav)
  side: MatSidenav;

  userAccount:  UserAccountDTO;
  accessRights: UserAccessRights;

  enterprise:   Enterprise;
  departments:  Department[];
  views:        WorkScheduleView[];

  selectedDepartment: Department;
  orgLevelName: string;

  sideNavOpened: boolean;

  isEnterpriseAdmin: boolean;
  isEnterpriseOrMultiDepartmentLevel: boolean;

  constructor(private authService: AuthService,
              private paginationService: PaginationService,
              private enterpriseService: EnterpriseService,
              private departmentService: DepartmentService,
              private scheduleViewService: WorkScheduleViewDTOService) { }

  ngOnInit(): void {
    this.userAccount = this.authService.currentUserAccount;

    this.accessRights = this.authService.currentUserValue?.accessRights;

    this.isEnterpriseAdmin = this.accessRights.isEnterpriseLevel && this.accessRights.isAdmin;
    this.isEnterpriseOrMultiDepartmentLevel = this.accessRights.isEnterpriseLevel || this.userAccount.departmentIds.length > 1;

    this.sideNavOpened = this.isEnterpriseOrMultiDepartmentLevel;

    if (this.accessRights.isEnterpriseLevel) {
      this.enterpriseService.getCurrent()
        .subscribe(enterprise => {
          this.enterprise = enterprise;
          this.orgLevelName = enterprise.name;
        });

      this.departmentService.getAllByEnterpriseId(this.userAccount.enterpriseId)
        .subscribe(departments => this.departments = departments.sort((a, b) => a.name.localeCompare(b.name)));
    }

    if (this.accessRights.isDepartmentLevel && this.userAccount.departmentIds.length > 1) {
      this.enterpriseService.getCurrent()
        .subscribe(enterprise => {
          this.enterprise = enterprise;
          this.orgLevelName = enterprise.name;
        });

      this.departmentService.getByIds(this.userAccount.departmentIds)
        .subscribe(departments => this.departments = departments.sort((a, b) => a.name.localeCompare(b.name)));

    } else if (this.userAccount.level === UserAccountLevel.DEPARTMENT
      || this.userAccount.level === UserAccountLevel.SHIFT) {

      this.departmentService.getByIds(this.userAccount.departmentIds)
        .subscribe(department => {
          this.selectedDepartment = department[0];
          this.scheduleViewService.getAllByDepartmentId(this.selectedDepartment.id)
            .subscribe(views => this.views = views);
          this.orgLevelName = department[0].name;
        });
    }

  }

  ngOnDestroy(): void {
    this.paginationService.clearStoredValue();
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
    if (this.isEnterpriseOrMultiDepartmentLevel) {
      this.scheduleViewService.getAllByDepartmentId(this.selectedDepartment.id)
        .subscribe(views => this.views = views);
    }
    this.orgLevelName = department.name
  }
}
