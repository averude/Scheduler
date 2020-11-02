import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PatternUnit } from "../../../../../../../../model/pattern-unit";
import { timeValidationPattern } from "../../../../../../../../shared/utils/utils";
import { DepartmentDayType } from "../../../../../../../../model/department-day-type";

@Component({
  selector: 'app-custom-daytype-dialog',
  templateUrl: './custom-daytype-dialog.component.html',
  styleUrls: ['./custom-daytype-dialog.component.css']
})
export class CustomDaytypeDialogComponent implements OnInit {

  departmentDayTypes: DepartmentDayType[];
  customDayTypeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CustomDaytypeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.departmentDayTypes = data.filter(depDayType => !depDayType.dayType.usePreviousValue);
  }

  ngOnInit() {
    this.customDayTypeForm = this.fb.group({
      dayTypeId:        [null, Validators.required],
      startTime:        [null, [Validators.required,
                                Validators.pattern(timeValidationPattern)]],
      endTime:          [null, [Validators.required,
                                Validators.pattern(timeValidationPattern)]],
      breakStartTime:   [null, Validators.pattern(timeValidationPattern)],
      breakEndTime:     [null, Validators.pattern(timeValidationPattern)]
    });
  }

  onDayTypeSelect(event) {
    let departmentDayType: DepartmentDayType = event.value;

    this.customDayTypeForm.patchValue({
      dayTypeId:      departmentDayType.dayType.id,
      startTime:      departmentDayType.startTime,
      endTime:        departmentDayType.endTime,
      breakStartTime: departmentDayType.breakStartTime,
      breakEndTime:   departmentDayType.breakEndTime
    });
  }

  create() {
    if (this.customDayTypeForm.invalid) {
      return;
    }

    this.dialogRef.close(<PatternUnit> this.customDayTypeForm.value);
  }
}
