import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { MainShiftComposition } from "../../../../../../../model/main-shift-composition";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DATE_FORMAT, getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { MAT_DATE_FORMATS } from "@angular/material/core";

@Component({
  selector: 'app-edit-shift-composition-dialog',
  templateUrl: './edit-shift-composition-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './edit-shift-composition-dialog.component.css'
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMAT
    }
  ]
})
export class EditShiftCompositionDialogComponent extends DialogBaseComponent<MainShiftComposition> {

  employeeName: string;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<MainShiftComposition>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.shiftSchedule, dialogRef);
    this.employeeName = this.getEmployeeShortName(data.shiftSchedule.employee);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [null, Validators.required],
      shiftId:      [null, Validators.required],
      employee:     [null, Validators.required],
      from:         [null, Validators.required],
      to:           [null, Validators.required]
    })
  }

  fillInTheForm(shiftComposition: MainShiftComposition) {
    console.log(shiftComposition);
    this.dialogForm.setValue({
      id:           shiftComposition.id,
      shiftId:      shiftComposition.shiftId,
      employee:     shiftComposition.employee,
      from:         shiftComposition.from,
      to:           shiftComposition.to,
    });
  }

  getEmployeeShortName(employee): string {
    return getEmployeeShortName(employee);
  }

  closeDialog(command) {
    if (this.dialogForm.invalid) {
      return;
    }

    this.dialog.close({
      command: command,
      data: this.dialogForm.value
    });
  }
}
