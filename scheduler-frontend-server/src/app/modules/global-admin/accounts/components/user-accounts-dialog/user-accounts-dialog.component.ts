import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { UserAccount } from "../../../../../model/user-account";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../http-services/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Department } from "../../../../../model/department";
import { Shift } from "../../../../../model/shift";
import { Employee } from "../../../../../model/employee";
import { Authority } from "../../../../../model/authority";

@Component({
  selector: 'app-user-accounts-dialog',
  templateUrl: './user-accounts-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css', './user-accounts-dialog.component.css']
})
export class UserAccountsDialogComponent extends DialogBaseComponent<UserAccount> {

  departments:  Department[]  = [];
  shifts:       Shift[]       = [];
  employees:    Employee[]    = [];
  authorities:  Authority[]   = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<UserAccountsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.userAccount, dialogRef);
    this.departments  = data.departments;
    this.shifts       = data.shifts;
    this.employees    = data.employees;
    this.authorities  = data.authorities;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      username:     ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      password:     ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      firstName:    ['', [Validators.required]],
      secondName:   ['', [Validators.required]],
      departmentId: [],
      shiftId:      [],
      employeeId:   [],
      locked:       [false, [Validators.required]],
      enabled:      [true,  [Validators.required]],
      authorities:  []
    });
  }

  fillInTheForm(userAccount: UserAccount) {
    this.dialogForm.setValue({
      id:           userAccount.id,
      username:     userAccount.username,
      password:     null,
      firstName:    userAccount.firstName,
      secondName:   userAccount.secondName,
      departmentId: userAccount.departmentId,
      shiftId:      userAccount.shiftId,
      employeeId:   userAccount.employeeId,
      locked:       userAccount.locked,
      enabled:      userAccount.enabled,
      authorities:  userAccount.authorities
    })
  }
}
