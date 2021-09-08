import { Component, Inject } from '@angular/core';
import { NewUserAccountDTO, UserAccountLevel, UserAccountRole } from "../../../../../model/dto/user-account-dto";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { Department } from "../../../../../model/department";

@Component({
  selector: 'app-add-department-user-account-dialog',
  templateUrl: './add-department-user-account-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css', './add-department-user-account-dialog.component.css']
})
export class AddDepartmentUserAccountDialogComponent extends DialogBaseComponent<NewUserAccountDTO> {

  roles: UserAccountRole[] = [UserAccountRole.ADMIN, UserAccountRole.USER];

  enterpriseId: number;

  departments: Department[] = [];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddDepartmentUserAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(null, dialogRef);
    this.enterpriseId = data.enterpriseId;
    this.departments  = data.departments;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:             [],
      username:       ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      name:           ['', Validators.maxLength(128)],
      password:       ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      role:           [null,  [Validators.required]],
      level:          [UserAccountLevel.DEPARTMENT, [Validators.required]],
      enterpriseId:   [this.enterpriseId],
      departmentIds:  [null, Validators.required]
    });
  }

  fillInTheForm(accountDTO: NewUserAccountDTO) {

  }

}
