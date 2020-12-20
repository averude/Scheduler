import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { WorkingNorm } from "../../../../../../../model/working-norm";
import { MatDatepicker } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../../../../../../services/http/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Moment } from "moment";
import { SelectionData } from "../../../../../../../lib/ngx-schedule-table/model/selection-data";

@Component({
  selector: 'app-working-norm-dialog',
  templateUrl: './working-norm-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './working-norm-dialog.component.css'
  ]
})
export class WorkingNormDialogComponent extends DialogBaseComponent<WorkingNorm> {

  selectionData: SelectionData;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<WorkingNormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.selectedCells[0].value, dialogRef);
    this.selectionData   = data;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      shiftId:      [this.selectionData.rowData.id],
      date:         [this.selectionData.selectedCells[0].date.isoString],
      hours:        [null, [Validators.required]],
      days:         [null, [Validators.required]]
    });
  }

  fillInTheForm(workingNorm: WorkingNorm) {
    this.dialogForm.setValue({
      id:           workingNorm.id,
      shiftId:      workingNorm.shiftId,
      date:         workingNorm.date,
      hours:        workingNorm.hours,
      days:         workingNorm.days
    });
  }

  onMonthSelected(value: Moment, datepicker: MatDatepicker<Moment>) {
    this.dialogForm.patchValue({date: value.toDate()});
    datepicker.close();
  }
}
