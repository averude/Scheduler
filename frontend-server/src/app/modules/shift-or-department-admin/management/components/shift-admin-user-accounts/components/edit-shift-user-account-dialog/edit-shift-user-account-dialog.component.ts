import { Component, Inject } from '@angular/core';
import {
  NewUserAccountDTO,
  UserAccountAuthority,
  UserAccountDTO,
  UserAccountRole
} from "../../../../../../../model/dto/new-user-account-dto";
import { Shift } from "../../../../../../../model/shift";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../../../services/http/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";

@Component({
  selector: 'app-edit-shift-user-account-dialog',
  templateUrl: './edit-shift-user-account-dialog.component.html',
  styleUrls: ['../../../../../../../shared/common/dialog.common.css',
    './edit-shift-user-account-dialog.component.css']
})
export class EditShiftUserAccountDialogComponent extends DialogBaseComponent<UserAccountDTO> {

  roles: UserAccountRole[] = [UserAccountRole.ADMIN, UserAccountRole.USER];
  shifts:  Shift[] = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<EditShiftUserAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);
    this.shifts  = data.shifts;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      username:     ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      name:         ['',  Validators.maxLength(128)],
      role:         [null,  [Validators.required]],
      authority:    [UserAccountAuthority.SHIFT_ADMIN, [Validators.required]],
      shiftIds:     [[], Validators.required]
    });
  }

  fillInTheForm(accountDTO: NewUserAccountDTO) {
    this.dialogForm.setValue({
      id:           accountDTO.id,
      username:     accountDTO.username,
      name:         accountDTO.name,
      authority:    accountDTO.authority,
      role:         accountDTO.role,
      shiftIds:     accountDTO.shiftIds
    });
  }

}
