import { Component, Inject } from "@angular/core";
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { ShiftAdminUserAccount, UserAccount } from "../../../../../../../model/accounts/user-account";
import { FormBuilder, Validators } from "@angular/forms";
import { Shift } from "../../../../../../../model/shift";
import { AuthService } from "../../../../../../../services/http/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-user-accounts-dialog',
  templateUrl: './user-accounts-dialog.component.html',
  styleUrls: ['../../../../../../../shared/common/dialog.common.css', './user-accounts-dialog.component.css']
})
export class UserAccountsDialogComponent extends DialogBaseComponent<UserAccount> {

  shifts:  Shift[] = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<UserAccountsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.userAccount, dialogRef);
    this.shifts  = data.shifts;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      username:     ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      name:         ['', Validators.maxLength(128)],
      password:     ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      shiftId:      [null,  [Validators.required]],
      role:         [null,  [Validators.required]],
      locked:       [false, [Validators.required]],
      enabled:      [true,  [Validators.required]]
    });
  }

  fillInTheForm(userAccount: ShiftAdminUserAccount) {
    this.dialogForm.setValue({
      username:     userAccount.username,
      name:         userAccount.name,
      password:     null,
      shiftId:      userAccount.shiftId,
      role:         userAccount.role,
      locked:       userAccount.locked,
      enabled:      userAccount.enabled
    });
  }
}
