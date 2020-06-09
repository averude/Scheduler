import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { Holiday } from "../../../../../model/holiday";
import { AuthService } from "../../../../../http-services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-holidays-dialog',
  templateUrl: './holidays-dialog.component.html',
  styleUrls: [
    '../../../../../shared/common/dialog.common.css',
    './holidays-dialog.component.css'
  ]
})
export class HolidaysDialogComponent extends DialogBaseComponent<Holiday> {

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<HolidaysDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.holiday, dialogRef);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id: [],
      // departmentId: [this.authService.departmentId],
      name: [null, [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(255)]],
      date: [null, [Validators.required]]
    });
  }

  fillInTheForm(holiday: Holiday) {
    this.dialogForm.setValue({
      id:           holiday.id,
      // departmentId: holiday.departmentId,
      name:         holiday.name,
      date:         holiday.date
    });
  }
}
