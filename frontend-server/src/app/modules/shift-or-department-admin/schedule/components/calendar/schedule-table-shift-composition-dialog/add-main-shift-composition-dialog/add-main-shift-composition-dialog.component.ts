import { Component, Inject } from '@angular/core';
import { Employee } from "../../../../../../../model/employee";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MainShiftComposition } from "../../../../../../../model/main-shift-composition";
import { CalendarDay } from "../../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import * as moment from "moment";
import { DATE_FORMAT, getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { MAT_DATE_FORMATS } from "@angular/material/core";

@Component({
  selector: 'app-add-main-shift-composition-dialog',
  templateUrl: './add-main-shift-composition-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './add-main-shift-composition-dialog.component.css'
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMAT
    }
  ]
})
export class AddMainShiftCompositionDialogComponent extends DialogBaseComponent<MainShiftComposition> {

  shiftId: number;
  employees: Employee[] = [];
  calendarDays: CalendarDay[];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<MainShiftComposition>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(null, dialogRef);

    this.shiftId      = data.shiftId;
    this.employees    = data.employees;
    this.calendarDays = data.calendarDays;
  }

  fillInTheForm(mainShiftComposition: MainShiftComposition) {
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      shiftId:      [this.shiftId, Validators.required],
      employees:    [null,  [Validators.required,
                             Validators.minLength(1)]],
      from:         [moment.utc(this.calendarDays[0].isoString), Validators.required],
      to:           [moment.utc(this.calendarDays[this.calendarDays.length - 1].isoString), Validators.required]
    })
  }

  getEmployeeShortName(employee): string {
    return getEmployeeShortName(employee);
  }


  submit() {
    if (this.dialogForm.invalid) {
      return;
    }

    const dialogResult = this.dialogForm.value;
    const result = dialogResult.employees.map(employee => {
      const composition = new MainShiftComposition();
      composition.employeeId = employee.id;
      composition.positionId = employee.position.id;
      composition.shiftId = dialogResult.shiftId;
      composition.from = dialogResult.from;
      composition.to = dialogResult.to;
      return composition;
    });
    
    this.dialog.close(result);
  }
}
