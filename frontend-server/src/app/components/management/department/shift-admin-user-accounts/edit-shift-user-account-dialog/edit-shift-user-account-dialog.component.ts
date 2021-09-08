import { Component, Inject } from '@angular/core';
import {
  NewUserAccountDTO,
  UserAccountDTO,
  UserAccountLevel,
  UserAccountRole
} from "../../../../../model/dto/user-account-dto";
import { Shift } from "../../../../../model/shift";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../services/http/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";

@Component({
  selector: 'app-edit-shift-user-account-dialog',
  templateUrl: './edit-shift-user-account-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css',
    './edit-shift-user-account-dialog.component.css']
})
export class EditShiftUserAccountDialogComponent extends DialogBaseComponent<UserAccountDTO> {

  roles: UserAccountRole[] = [UserAccountRole.ADMIN, UserAccountRole.USER];
  shifts:  Shift[] = [];

  private readonly enterpriseId: number;
  private readonly departmentId: number;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<EditShiftUserAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);
    this.shifts  = data.shifts;
    this.enterpriseId = data.enterpriseId;
    this.departmentId = data.departmentId;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:             [],
      username:       ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      name:           ['',  Validators.maxLength(128)],
      role:           [null,  [Validators.required]],
      level:          [UserAccountLevel.SHIFT, [Validators.required]],
      enterpriseId:   [this.enterpriseId],
      departmentIds:  [[this.departmentId]],
      shiftIds:       [[], Validators.required]
    });
  }

  fillInTheForm(accountDTO: NewUserAccountDTO) {
    this.dialogForm.setValue({
      id:             accountDTO.id,
      username:       accountDTO.username,
      name:           accountDTO.name,
      level:          accountDTO.level,
      role:           accountDTO.role,
      enterpriseId:   accountDTO.enterpriseId,
      departmentIds:  accountDTO.departmentIds,
      shiftIds:       accountDTO.shiftIds
    });
  }

}
