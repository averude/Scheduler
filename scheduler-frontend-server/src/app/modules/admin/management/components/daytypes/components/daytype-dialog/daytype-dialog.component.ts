import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { DayType } from "../../../../../../../model/day-type";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AuthService } from "../../../../../../../http-services/auth.service";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";

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
      departmentId:     [this.authService.currentUserValue.departmentId],
      dayTypeGroupId:   [null,  [Validators.required]],
      name:             ['',    [Validators.required,
                                 Validators.minLength(3),
                                 Validators.maxLength(64)]],
      label:            [null,  [Validators.maxLength(3)]],
      startTime:        [null,  [Validators.min(0),
                                 Validators.max(1440)]],
      endTime:          [null,  [Validators.min(0),
                                 Validators.max(1440)]],
      breakStartTime:   [null,  [Validators.min(0),
                                 Validators.max(1440)]],
      breakEndTime:     [null,  [Validators.min(0),
                                 Validators.max(1440)]],
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
