import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTableModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleGenerationTableComponent } from './components/schedule-generation-table/schedule-generation-table.component';
import { ScheduleGenerationDialogComponent } from './components/schedule-generation-dialog/schedule-generation-dialog.component';
import { ScheduleGenerationComponent } from './components/schedule-generation/schedule-generation.component';

@NgModule({
  declarations: [
    ScheduleGenerationTableComponent,
    ScheduleGenerationDialogComponent,
    ScheduleGenerationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatNativeDateModule
  ],
  exports: [
    ScheduleGenerationComponent,
    ScheduleGenerationDialogComponent
  ],
  providers: [
    MatNativeDateModule
  ]
})
export class ScheduleGenerationModule { }
