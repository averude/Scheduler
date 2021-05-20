import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkScheduleViewsTableComponent } from './work-schedule-views-table/work-schedule-views-table.component';
import { WorkScheduleViewsDialogComponent } from './work-schedule-views-dialog/work-schedule-views-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  declarations: [
    WorkScheduleViewsTableComponent,
    WorkScheduleViewsDialogComponent
  ]
})
export class WorkScheduleViewModule { }
