import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatTableModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleGenerationDialogComponent } from './components/schedule-generation-dialog/schedule-generation-dialog.component';
import { ScheduleGenerationComponent } from './components/schedule-generation/schedule-generation.component';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { ScheduleGeneratedService } from "./components/schedule-generated.service";

@NgModule({
  declarations: [
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
    MatMomentDateModule,
    MatProgressBarModule
  ],
  exports: [
    ScheduleGenerationComponent,
    ScheduleGenerationDialogComponent
  ],
  providers: [
    MatMomentDateModule,
    ScheduleGeneratedService
  ]
})
export class ScheduleGenerationModule { }
