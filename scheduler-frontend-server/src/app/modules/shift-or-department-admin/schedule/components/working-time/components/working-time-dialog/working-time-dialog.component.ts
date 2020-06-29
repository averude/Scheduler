import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { WorkingTime } from "../../../../../../../model/working-time";
import { MatDatepicker } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../../../../../../services/http/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Moment } from "moment";
import { SelectionData } from "../../../../../../../lib/ngx-schedule-table/model/selection-data";

@Component({
  selector: 'app-working-time-dialog',
  templateUrl: './working-time-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './working-time-dialog.component.css'
  ]
})
export class WorkingTimeDialogComponent extends DialogBaseComponent<WorkingTime> {

  selectionData: SelectionData;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<WorkingTimeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.selectedCells[0].value, dialogRef);
    this.selectionData   = data;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      shiftId:      [this.selectionData.rowData.id],
      date:         [this.selectionData.selectedCells[0].date],
      hours:        [null, [Validators.required]]
    });
  }

  fillInTheForm(workingTime: WorkingTime) {
    this.dialogForm.setValue({
      id:           workingTime.id,
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
