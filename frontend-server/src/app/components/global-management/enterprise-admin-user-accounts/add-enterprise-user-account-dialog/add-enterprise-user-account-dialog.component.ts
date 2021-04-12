import { Component, Inject } from '@angular/core';
import { NewUserAccountDTO, UserAccountAuthority, UserAccountRole } from "../../../../model/dto/user-account-dto";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogBaseComponent } from "../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { Enterprise } from "../../../../model/enterprise";

@Component({
  selector: 'app-add-enterprise-user-account-dialog',
  templateUrl: './add-enterprise-user-account-dialog.component.html',
  styleUrls: ['../../../../shared/common/dialog.common.css', './add-enterprise-user-account-dialog.component.css']
})
export class AddEnterpriseUserAccountDialogComponent extends DialogBaseComponent<NewUserAccountDTO> {

  roles: UserAccountRole[] = [UserAccountRole.ADMIN, UserAccountRole.USER];
  enterprises: Enterprise[] = [];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddEnterpriseUserAccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(null, dialogRef);
    this.enterprises = data.enterprises;
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
      authority:    [UserAccountAuthority.ENTERPRISE_ADMIN, [Validators.required]],
      enterpriseId: [null, Validators.required]
    });
  }

  fillInTheForm(accountDTO: NewUserAccountDTO) {

  }
}
