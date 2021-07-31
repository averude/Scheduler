import { Component, Inject } from '@angular/core';
import {
  NewUserAccountDTO,
  UserAccountDTO,
  UserAccountLevel,
  UserAccountRole
} from "../../../../../model/dto/user-account-dto";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Department } from "../../../../../model/department";
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";

@Component({
  selector: 'app-edit-department-user-account-dialog',
  templateUrl: './edit-department-user-account-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css',
    './edit-department-user-account-dialog.component.css']
})
export class EditDepartmentUserAccountDialogComponent extends DialogBaseComponent<UserAccountDTO> {

  roles: UserAccountRole[] = [UserAccountRole.ADMIN, UserAccountRole.USER];

  enterpriseId: number;

  departments: Department[] = [];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditDepartmentUserAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);
    this.enterpriseId = data.enterpriseId;
    this.departments  = data.departments;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:             [],
      username:       ['', [Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(128)]],
      name:           ['',  Validators.maxLength(128)],
      role:           [null,  [Validators.required]],
      authority:      [UserAccountLevel.DEPARTMENT, [Validators.required]],
      enterpriseId:   [this.enterpriseId],
      departmentIds:  [null,  [Validators.required]]
    });
  }

  fillInTheForm(accountDTO: NewUserAccountDTO) {
    this.dialogForm.setValue({
      id:             accountDTO.id,
      username:       accountDTO.username,
      name:           accountDTO.name,
      authority:      accountDTO.authority,
      role:           accountDTO.role,
      enterpriseId:   accountDTO.enterpriseId,
      departmentIds:  accountDTO.departmentIds
    });
  }

}
