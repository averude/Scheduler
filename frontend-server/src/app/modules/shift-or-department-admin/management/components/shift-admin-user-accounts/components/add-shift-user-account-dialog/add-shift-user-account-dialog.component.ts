import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import {
  NewUserAccountDTO,
  UserAccountAuthority,
  UserAccountRole
} from "../../../../../../../model/dto/new-user-account-dto";
import { Shift } from "../../../../../../../model/shift";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../../../services/http/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-shift-user-account-dialog',
  templateUrl: './add-shift-user-account-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './add-shift-user-account-dialog.component.css'
  ]
})
export class AddShiftUserAccountDialogComponent extends DialogBaseComponent<NewUserAccountDTO> {

  roles: UserAccountRole[] = [UserAccountRole.ADMIN, UserAccountRole.USER];
  shifts:  Shift[] = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<AddShiftUserAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(null, dialogRef);
    this.shifts  = data.shifts;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      username:     ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      name:         ['', Validators.maxLength(128)],
      password:     ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      role:         [null,  [Validators.required]],
      authority:    [UserAccountAuthority.SHIFT_ADMIN, [Validators.required]],
      shiftIds:     [[], Validators.required]
    });
  }

  fillInTheForm(accountDTO: NewUserAccountDTO) {

  }

}
