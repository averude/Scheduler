import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { Shift } from "../../../../../../../model/shift";
import { AuthService } from "../../../../../../../services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ShiftPattern } from "../../../../../../../model/shiftpattern";

@Component({
  selector: 'app-shift-dialog',
  templateUrl: './shift-dialog.component.html',
  styleUrls: ['../../../../../../../shared/common/dialog.common.css', './shift-dialog.component.css']
})
export class ShiftDialogComponent extends DialogBaseComponent<Shift> {

  patterns: ShiftPattern[];

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<ShiftDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.shift);

    this.patterns = data.patterns;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id: [],
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(64)]],
      departmentId: [this.tempMethod()],
      patternId: [0, Validators.required]
    })
  }

  fillInTheForm(shift: Shift) {
    this.dialogForm.setValue({
      id: shift.id,
      name: shift.name,
      departmentId: shift.departmentId,
      patternId: shift.patternId
    })
  }

  tempMethod(): number {
    let user = this.authService.currentUserValue;
    return user ? user.departmentId : 1;
  }

  submit() {
    this.dialogRef.close(this.dialogForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
