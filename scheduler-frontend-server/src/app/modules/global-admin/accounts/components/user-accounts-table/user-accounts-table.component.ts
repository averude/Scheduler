import { Component } from '@angular/core';
import { TableBaseComponent } from "../../../../../shared/abstract-components/table-base/table-base.component";
import { UserAccount } from "../../../../../model/user-account";
import { UserAccountService } from "../../../../../http-services/user-account.service";
import { AuthorityService } from "../../../../../http-services/authority.service";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { Authority } from "../../../../../model/authority";
import { DepartmentService } from "../../../../../http-services/department.service";
import { Department } from "../../../../../model/department";
import { Shift } from "../../../../../model/shift";
import { ShiftService } from "../../../../../http-services/shift.service";
import { UserAccountsDialogComponent } from "../user-accounts-dialog/user-accounts-dialog.component";
import { EmployeeService } from "../../../../../http-services/employee.service";
import { Employee } from "../../../../../model/employee";

@Component({
  selector: 'app-user-accounts-table',
  templateUrl: './user-accounts-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './user-accounts-table.component.css']
})
export class UserAccountsTableComponent extends TableBaseComponent<UserAccount> {

  displayedColumns = ['select', 'username', 'firstName', 'secondName',
    'department', 'shift', 'employee',
    'locked', 'enabled', 'authorities', 'control'];

  departments:  Department[]  = [];
  shifts:       Shift[]       = [];
  employees:    Employee[]    = [];
  authorities:  Authority[]   = [];

  constructor(dialog: MatDialog,
              userAccountService: UserAccountService,
              notificationsService: NotificationsService,
              private departmentService: DepartmentService,
              private shiftService: ShiftService,
              private employeeService: EmployeeService,
              private authoritiesService: AuthorityService) {
    super(dialog, userAccountService, notificationsService);

    this.departmentService.getAllByAuth()
      .subscribe(departments => this.departments = departments);
    this.shiftService.getAllByAuth()
      .subscribe(shifts => this.shifts = shifts);
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees);
    this.authoritiesService.getAll()
      .subscribe(authorities => this.authorities = authorities);
  }

  openDialog(userAccount: UserAccount) {
    const data = {
      userAccount:  userAccount,
      departments:  this.departments,
      shifts:       this.shifts,
      employees:    this.employees,
      authorities:  this.authorities
    };

    this.openAddOrEditDialog(userAccount, data, UserAccountsDialogComponent);
  }

  authoritiesToString(authorities: Authority[]): string {
    if (authorities) {
      return authorities.map(value => value.name).join();
    } else {
      return "";
    }
  }

  getDepartmentById(id: number): Department {
    return this.departments.find(value => value.id === id);
  }

  getShiftById(id: number): Shift {
    return this.shifts.find(value => value.id === id);
  }
}
