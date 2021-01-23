import { Component, Inject } from "@angular/core";
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { FormBuilder, Validators } from "@angular/forms";
import { Shift } from "../../../../../../../model/shift";
import { AuthService } from "../../../../../../../services/http/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AccountDTO } from "../../../../../../../model/dto/account-dto";


@Component({
  selector: 'app-user-accounts-dialog',
  templateUrl: './user-accounts-dialog.component.html',
  styleUrls: ['../../../../../../../shared/common/dialog.common.css', './user-accounts-dialog.component.css']
})
export class UserAccountsDialogComponent extends DialogBaseComponent<AccountDTO> {

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
      userAccount: this.fb.group({
        id:           [],
        username:     ['', [Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(128)]],
        name:         ['', Validators.maxLength(128)],
        password:     ['', [Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(128)]],
        role:         [null,  [Validators.required]],
        authority:    ['SHIFT_ADMIN'],
        locked:       [false, [Validators.required]],
        enabled:      [true,  [Validators.required]]
      }),
      shiftIds: [[], Validators.required]
    });
  }

  fillInTheForm(dto: AccountDTO) {
    const userAccount = dto.userAccount;
    this.dialogForm.setValue({
      userAccount: {
        id:           userAccount.id,
        username:     userAccount.username,
        name:         userAccount.name,
        password:     null,
        authority:    userAccount.authority,
        role:         userAccount.role,
        locked:       userAccount.locked,
        enabled:      userAccount.enabled
      },
      shiftIds: dto.shiftIds
    });
  }
}
