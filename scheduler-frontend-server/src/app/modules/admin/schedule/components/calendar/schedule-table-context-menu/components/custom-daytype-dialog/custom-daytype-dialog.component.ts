import { Component, Inject, OnInit } from '@angular/core';
import { DayType } from "../../../../../../../../model/day-type";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PatternUnit } from "../../../../../../../../model/pattern-unit";
import { timeValidationPattern } from "../../../../../../../../shared/utils/time-converter";

@Component({
  selector: 'app-custom-daytype-dialog',
  templateUrl: './custom-daytype-dialog.component.html',
  styleUrls: ['./custom-daytype-dialog.component.css']
})
export class CustomDaytypeDialogComponent implements OnInit {

  dayTypes: DayType[];
  customDayTypeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CustomDaytypeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.dayTypes = data.filter(dayType => !dayType.usePreviousValue);
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
    let dayType: DayType = event.value;

    this.customDayTypeForm.patchValue({
      dayTypeId:      dayType.id,
      startTime:      dayType.startTime,
      endTime:        dayType.endTime,
      breakStartTime: dayType.breakStartTime,
      breakEndTime:   dayType.breakEndTime
    });
  }

  create() {
    if (this.customDayTypeForm.invalid) {
      return;
    }

    this.dialogRef.close(<PatternUnit> this.customDayTypeForm.value);
  }
}
