import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { DayType } from "../../../../../model/day-type";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../../../../services/http/auth.service";
import { DayTypeGroup } from "../../../../../model/day-type-group";

@Component({
  selector: 'app-daytypes-dialog',
  templateUrl: './daytype-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css','./daytype-dialog.component.css']
})
export class DayTypeDialogComponent extends DialogBaseComponent<DayType> {
  dayTypeGroups:  DayTypeGroup[]  = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<DayTypeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dayType, dialogRef);
    this.dayTypeGroups  = data.dayTypeGroups;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:               [],
      dayTypeGroup:     [null,  [Validators.required]],
      name:             ['',    [Validators.required,
                                 Validators.minLength(3),
                                 Validators.maxLength(64)]],
      label:            [null,  [Validators.maxLength(5)]],
      reportLabel:      [null,  [Validators.maxLength(5)]],
      usePreviousValue: [false]
    });
  }

  fillInTheForm(dayType: DayType) {
    this.dialogForm.setValue({
      id:               dayType.id,
      dayTypeGroup:     dayType.dayTypeGroup,
      name:             dayType.name,
      label:            dayType.label,
      reportLabel:      dayType.reportLabel,
      usePreviousValue: dayType.usePreviousValue
    });
  }
}
