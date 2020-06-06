import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { ShiftComposition } from "../../../../../../../model/shift-composition";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";
import { getEmployeeShortName } from "../../../../../../../shared/utils/utils";

@Component({
  selector: 'app-shift-composition-dialog',
  templateUrl: './shift-composition-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './shift-composition-dialog.component.css'
  ]
})
export class ShiftCompositionDialogComponent extends DialogBaseComponent<ShiftComposition> {

  employees:  Employee[];
  shifts:     Shift[];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ShiftComposition>,
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
      substitution: [true, Validators.required]
    });
  }

  fillInTheForm(shiftSchedule: ShiftComposition) {
    this.dialogForm.setValue({
      id:           shiftSchedule.id,
      shiftId:      shiftSchedule.shiftId,
      employeeId:   shiftSchedule.employeeId,
      from:         shiftSchedule.from,
      to:           shiftSchedule.to,
      substitution: shiftSchedule.substitution,
    })
  }

  getEmployeeShortName(employee): string {
    return getEmployeeShortName(employee);
  }
}