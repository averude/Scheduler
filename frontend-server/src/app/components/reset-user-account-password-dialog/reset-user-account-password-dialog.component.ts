import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import {
  CrossFieldErrorMatcher,
  passwordValidator
} from "../change-user-account-password-dialog/change-user-account-password-dialog.component";

@Component({
  selector: 'app-reset-user-account-password-dialog',
  templateUrl: './reset-user-account-password-dialog.component.html',
  styleUrls: ['./reset-user-account-password-dialog.component.css']
})
export class ResetUserAccountPasswordDialogComponent implements OnInit {

  errorMatcher = new CrossFieldErrorMatcher();
  dialogForm: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ResetUserAccountPasswordDialogComponent>) {}

  ngOnInit(): void {
    this.dialogForm = this.fb.group({
      newPassword:      [null, Validators.required],
      confirmPassword:  [null, Validators.required]
    }, { validators: [passwordValidator] });
  }

  submit() {
    this.dialogRef.close(this.dialogForm.value);
  }

}
