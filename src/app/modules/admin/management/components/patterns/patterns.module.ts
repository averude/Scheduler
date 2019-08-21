import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PatternUnitComponent } from './components/pattern-unit/pattern-unit.component';
import {
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import { UnitControlService } from "./services/unit-control.service";
import { PatternsTableComponent } from './components/patterns-table/patterns-table.component';
import { PatternDialogComponent } from './components/pattern-dialog/pattern-dialog.component';

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
    PatternUnitComponent,
    PatternsTableComponent,
    PatternDialogComponent
  ],
  providers: [
    UnitControlService
  ],
  entryComponents: [PatternDialogComponent]
})
export class PatternsModule {}
