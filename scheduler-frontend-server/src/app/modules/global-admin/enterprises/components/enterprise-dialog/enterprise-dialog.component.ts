import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { Enterprise } from "../../../../../model/enterprise";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../http-services/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-enterprise-dialog',
  templateUrl: './enterprise-dialog.component.html',
  styleUrls: ['./enterprise-dialog.component.css']
})
export class EnterpriseDialogComponent extends DialogBaseComponent<Enterprise> {

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<EnterpriseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.enterprise, dialogRef);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:     [],
      name:   ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)]]
    });
  }

  fillInTheForm(enterprise: Enterprise) {
    this.dialogForm.setValue({
      id:     enterprise.id,
      name:   enterprise.name
    });
  }

}
