import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvrEntityGenerationComponent } from './avr-entity-generation/avr-entity-generation.component';
import { AvrEntityGenerationDialogComponent } from './avr-entity-generation-dialog/avr-entity-generation-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
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
  declarations: [
    AvrEntityGenerationComponent,
    AvrEntityGenerationDialogComponent
  ],
  exports: [AvrEntityGenerationComponent],
  providers: [MatMomentDateModule]
})
export class AvrEntityGenerationModule { }
