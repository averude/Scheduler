import { Component, Inject } from '@angular/core';
import {
  NewUserAccountDTO,
  UserAccountAuthority,
  UserAccountDTO,
  UserAccountRole
} from "../../../../model/dto/new-user-account-dto";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../services/http/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogBaseComponent } from "../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { Enterprise } from "../../../../model/enterprise";

@Component({
  selector: 'app-edit-enterprise-user-account-dialog',
  templateUrl: './edit-enterprise-user-account-dialog.component.html',
  styleUrls: ['../../../../shared/common/dialog.common.css', './edit-enterprise-user-account-dialog.component.css']
})
export class EditEnterpriseUserAccountDialogComponent extends DialogBaseComponent<UserAccountDTO> {

  roles: UserAccountRole[] = [UserAccountRole.ADMIN, UserAccountRole.USER];
  enterprises: Enterprise[] = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<EditEnterpriseUserAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);
    this.enterprises  = data.enterprises;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      username:     ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(128)]],
      name:         ['', Validators.maxLength(128)],
      role:         [null,  [Validators.required]],
      authority:    [UserAccountAuthority.ENTERPRISE_ADMIN, [Validators.required]],
      enterpriseId: [null, Validators.required]
    });
  }

  fillInTheForm(accountDTO: NewUserAccountDTO) {
    this.dialogForm.setValue({
      id:           accountDTO.id,
      username:     accountDTO.username,
      name:         accountDTO.name,
      authority:    accountDTO.authority,
      role:         accountDTO.role,
      enterpriseId: accountDTO.enterpriseId
    });
  }
}
