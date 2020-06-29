import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvrEntityGenerationComponent } from './avr-entity-generation/avr-entity-generation.component';
import { AvrEntityGenerationDialogComponent } from './avr-entity-generation-dialog/avr-entity-generation-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatTableModule
} from "@angular/material";
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
  providers: [MatMomentDateModule],
  entryComponents: [AvrEntityGenerationDialogComponent]
})
export class AvrEntityGenerationModule { }
