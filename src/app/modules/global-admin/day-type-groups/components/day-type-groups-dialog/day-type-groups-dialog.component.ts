import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { DayTypeGroup } from "../../../../../model/day-type-group";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-day-type-groups-dialog',
  templateUrl: './day-type-groups-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css',
    './day-type-groups-dialog.component.css']
})
export class DayTypeGroupsDialogComponent extends DialogBaseComponent<DayTypeGroup> {

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DayTypeGroupsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dayTypeGroup, dialogRef);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:     [],
      name:   ['', [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(64)]],
      color:  ['', [Validators.required,
                    Validators.maxLength(7)]]
    })
  }

  fillInTheForm(dayTypeGroup: DayTypeGroup) {
    this.dialogForm.setValue({
      id:     dayTypeGroup.id,
      name:   dayTypeGroup.name,
      color:  dayTypeGroup.color
    })
  }
}
