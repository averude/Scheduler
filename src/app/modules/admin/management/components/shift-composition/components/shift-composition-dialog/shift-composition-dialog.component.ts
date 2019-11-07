import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { ShiftSchedule } from "../../../../../../../model/shift-schedule";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";

@Component({
  selector: 'app-shift-composition-dialog',
  templateUrl: './shift-composition-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './shift-composition-dialog.component.css'
  ]
})
export class ShiftCompositionDialogComponent extends DialogBaseComponent<ShiftSchedule> {

  employees:  Employee[];
  shifts:     Shift[];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ShiftSchedule>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.shiftSchedule, dialogRef);
    this.employees = data.employees;
    this.shifts = data.shifts;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      shiftId:      [null, Validators.required],
      employeeId:   [null, Validators.required],
      from:         [null, Validators.required],
      to:           [null, Validators.required],
      substitution: [false, Validators.required]
    });
  }

  fillInTheForm(shiftSchedule: ShiftSchedule) {
    this.dialogForm.setValue({
      id:           shiftSchedule.id,
      shiftId:      shiftSchedule.shiftId,
      employeeId:   shiftSchedule.employeeId,
      from:         shiftSchedule.from,
      to:           shiftSchedule.to,
      substitution: shiftSchedule.substitution,
    })
  }
}
