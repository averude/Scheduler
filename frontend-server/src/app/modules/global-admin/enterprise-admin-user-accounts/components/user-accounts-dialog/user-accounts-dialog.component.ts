import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { UserAccount } from "../../../../../model/accounts/user-account";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../services/http/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Enterprise } from "../../../../../model/enterprise";

@Component({
  selector: 'app-user-accounts-dialog',
  templateUrl: './user-accounts-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css', './user-accounts-dialog.component.css']
})
export class UserAccountsDialogComponent extends DialogBaseComponent<UserAccount> {

  enterprises:  Enterprise[]  = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<UserAccountsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.userAccount, dialogRef);
    this.enterprises  = data.enterprises;
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
      enterpriseId: [null,  [Validators.required]],
      role:         [null,  [Validators.required]],
      locked:       [false, [Validators.required]],
      enabled:      [true,  [Validators.required]]
    });
  }

  fillInTheForm(userAccount: UserAccount) {
    this.dialogForm.setValue({
      username:     userAccount.username,
      name:         userAccount.name,
      password:     null,
      enterpriseId: userAccount.enterpriseId,
      locked:       userAccount.locked,
      enabled:      userAccount.enabled
    });
  }
}
