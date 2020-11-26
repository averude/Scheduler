import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { MainShiftComposition } from "../../../../../../../model/main-shift-composition";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";
import { DATE_FORMAT, getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { MAT_DATE_FORMATS } from "@angular/material/core";

@Component({
  selector: 'app-main-shift-composition-dialog',
  templateUrl: './main-shift-composition-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './main-shift-composition-dialog.component.css'
  ],
  providers: [
    {
    provide: MAT_DATE_FORMATS,
    useValue: DATE_FORMAT
    }
  ]
})
export class MainShiftCompositionDialogComponent extends DialogBaseComponent<MainShiftComposition> {

  employees:  Employee[];
  shifts:     Shift[];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<MainShiftComposition>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.shiftSchedule, dialogRef);
    this.employees = data.employees;
    this.shifts = data.shifts;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      shiftId:      [null, Validators.required],
      employee:     [null, Validators.required],
      from:         [null, Validators.required],
      to:           [null, Validators.required]
    });
  }

  fillInTheForm(shiftSchedule: MainShiftComposition) {
    this.dialogForm.setValue({
      id:           shiftSchedule.id,
      shiftId:      shiftSchedule.shiftId,
      employee:     shiftSchedule.employee,
      from:         shiftSchedule.from,
      to:           shiftSchedule.to,
    })
  }

  getEmployeeShortName(employee): string {
    return getEmployeeShortName(employee);
  }
}
