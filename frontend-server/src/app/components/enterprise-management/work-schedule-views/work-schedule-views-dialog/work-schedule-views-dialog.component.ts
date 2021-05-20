import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { BasicDTO } from "../../../../model/dto/basic-dto";
import { WorkScheduleView } from "../../../../model/work-schedule-view";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DayType } from "../../../../model/day-type";
import { Department } from "../../../../model/department";

@Component({
  selector: 'app-work-schedule-views-dialog',
  templateUrl: './work-schedule-views-dialog.component.html',
  styleUrls: ['../../../../shared/common/dialog.common.css',
              './work-schedule-views-dialog.component.css']
})
export class WorkScheduleViewsDialogComponent extends DialogBaseComponent<BasicDTO<WorkScheduleView, number>>{

  enterpriseId: number;
  dayTypes:     DayType[];
  departments:  Department[];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<WorkScheduleViewsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);
    this.dayTypes     = data.dayTypes;
    this.departments  = data.departments;
    this.enterpriseId = data.enterpriseId;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      parent: this.fb.group({
        id:                 [],
        enterpriseId:       [this.enterpriseId],
        targetDepartmentId: [null, Validators.required],
        departmentId:       [null, Validators.required],
        name:               [null, Validators.required]
      }),
      collection: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  fillInTheForm(dto: BasicDTO<WorkScheduleView, number>) {
    this.dialogForm.setValue({parent: dto.parent, collection: dto.collection})
  }

}
