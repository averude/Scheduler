import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { DayType } from "../../../../../../../model/daytype";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-daytypes-dialog',
  templateUrl: './daytype-dialog.component.html',
  styleUrls: ['../../../../../../../shared/common/dialog.common.css','./daytype-dialog.component.css']
})
export class DayTypeDialogComponent extends DialogBaseComponent<DayType> {

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DayTypeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dayType);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id: [],
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(64)]],
      label: ['', [Validators.maxLength(3)]]
    });
  }

  fillInTheForm(dayType: DayType) {
    this.dialogForm.setValue({
      id: dayType.id,
      name: dayType.name,
      label: dayType.label
    });
  }

  submit() {
    this.dialogRef.close(this.dialogForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
