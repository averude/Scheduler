import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
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
    MatButtonModule,
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
