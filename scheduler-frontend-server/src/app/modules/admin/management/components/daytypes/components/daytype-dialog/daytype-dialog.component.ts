import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { DayType } from "../../../../../../../model/day-type";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../../../../../../http-services/auth.service";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { timeValidationPattern } from "../../../../../../../shared/utils/time-converter";

@Component({
  selector: 'app-daytypes-dialog',
  templateUrl: './daytype-dialog.component.html',
  styleUrls: ['../../../../../../../shared/common/dialog.common.css','./daytype-dialog.component.css']
})
export class DayTypeDialogComponent extends DialogBaseComponent<DayType> {
  dayTypeGroups: DayTypeGroup[] = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<DayTypeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dayType, dialogRef);
    this.dayTypeGroups = data.dayTypeGroups;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:               [],
      departmentId:     [this.authService.departmentId],
      dayTypeGroupId:   [null,  [Validators.required]],
      name:             ['',    [Validators.required,
                                 Validators.minLength(3),
                                 Validators.maxLength(64)]],
      label:            [null,  [Validators.maxLength(3)]],
      startTime:        [null,  [Validators.pattern(timeValidationPattern)]],
      endTime:          [null,  [Validators.pattern(timeValidationPattern)]],
      breakStartTime:   [null,  [Validators.pattern(timeValidationPattern)]],
      breakEndTime:     [null,  [Validators.pattern(timeValidationPattern)]],
      usePreviousValue: [false]
    });
  }

  fillInTheForm(dayType: DayType) {
    this.dialogForm.setValue({
      id:               dayType.id,
      departmentId:     dayType.departmentId,
      dayTypeGroupId:   dayType.dayTypeGroupId,
      name:             dayType.name,
      label:            dayType.label,
      startTime:        dayType.startTime,
      endTime:          dayType.endTime,
      breakStartTime:   dayType.breakStartTime,
      breakEndTime:     dayType.breakEndTime,
      usePreviousValue: dayType.usePreviousValue
    });
  }
}
