import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SPECIAL_CALENDAR_DATE_TYPES, SpecialCalendarDate } from "../../../../../model/special-calendar-date";

@Component({
  selector: 'app-special-calendar-dates-dialog',
  templateUrl: './special-calendar-dates-dialog.component.html',
  styleUrls: [
    '../../../../../shared/common/dialog.common.css',
    './special-calendar-dates-dialog.component.css'
  ]
})
export class SpecialCalendarDatesDialogComponent extends DialogBaseComponent<SpecialCalendarDate> {

  dateTypes: string[] = SPECIAL_CALENDAR_DATE_TYPES;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<SpecialCalendarDatesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.specialCalendarDate, dialogRef);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:       [],
      dateType: [null, Validators.required],
      name:     [null, [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(255)]],
      date:     [null, [Validators.required]]
    });
  }

  fillInTheForm(specialCalendarDate: SpecialCalendarDate) {
    this.dialogForm.setValue({
      id:           specialCalendarDate.id,
      dateType:     specialCalendarDate.dateType,
      name:         specialCalendarDate.name,
      date:         specialCalendarDate.date
    });
  }
}
