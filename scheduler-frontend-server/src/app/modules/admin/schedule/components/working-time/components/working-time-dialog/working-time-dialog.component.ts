import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { WorkingTime } from "../../../../../../../model/working-time";
import { MatDatepicker } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../../../../../../http-services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Shift } from "../../../../../../../model/shift";
import { Moment } from "moment";

@Component({
  selector: 'app-working-time-dialog',
  templateUrl: './working-time-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './working-time-dialog.component.css'
  ]
})
export class WorkingTimeDialogComponent extends DialogBaseComponent<WorkingTime> {

  shifts: Shift[] = [];

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<WorkingTimeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.workingTime, dialogRef);
    this.shifts = data.shifts;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      departmentId: [this.authService.departmentId, [Validators.required]],
      shiftId:      [null, [Validators.required]],
      date:         [null, [Validators.required]],
      hours:        [null, [Validators.required]]
    });
  }

  fillInTheForm(workingTime: WorkingTime) {
    this.dialogForm.setValue({
      id:           workingTime.id,
      departmentId: workingTime.departmentId,
      shiftId:      workingTime.shiftId,
      date:         workingTime.date,
      hours:        workingTime.hours
    });
  }

  onMonthSelected(value: Moment, datepicker: MatDatepicker<Moment>) {
    this.dialogForm.patchValue({date: value.toDate()});
    datepicker.close();
  }
}
