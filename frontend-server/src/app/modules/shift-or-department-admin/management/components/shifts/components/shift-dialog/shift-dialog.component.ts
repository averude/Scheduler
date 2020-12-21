import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { Shift } from "../../../../../../../model/shift";
import { AuthService } from "../../../../../../../services/http/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ShiftPattern } from "../../../../../../../model/shift-pattern";

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
    super(data.shift, dialogRef);

    this.patterns = data.patterns;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:             [],
      name:           ['',    [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(64)]],
      shiftPatternId: []
    })
  }

  fillInTheForm(shift: Shift) {
    this.dialogForm.setValue({
      id:             shift.id,
      name:           shift.name,
      shiftPatternId: shift.shiftPatternId
    })
  }
}
