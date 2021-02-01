import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ErrorStateMatcher } from "@angular/material/core";

@Component({
  selector: 'app-change-user-account-password-dialog',
  templateUrl: './change-user-account-password-dialog.component.html',
  styleUrls: ['./change-user-account-password-dialog.component.css']
})
export class ChangeUserAccountPasswordDialogComponent implements OnInit {

  errorMatcher = new CrossFieldErrorMatcher();
  dialogForm: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ChangeUserAccountPasswordDialogComponent>) {}

  ngOnInit(): void {
    this.dialogForm = this.fb.group({
      oldPassword:      [null, Validators.required],
      newPassword:      [null, Validators.required],
      confirmPassword:  [null, Validators.required]
    }, { validators: [passwordValidator, samePasswordValidator] });
  }

  submit() {
    this.dialogRef.close(this.dialogForm.value);
  }

}

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword     = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  const isInvalid = newPassword.value !== confirmPassword.value;

  return isInvalid ? { passwordsDoNotMatch: true } : null ;
};

export const samePasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const oldPassword = control.get('oldPassword');
  const newPassword = control.get('newPassword');

  const isInvalid = oldPassword.value === newPassword.value;

  return isInvalid ? { samePassword: true } : null;
};

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
