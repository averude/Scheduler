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
  MatTableModule,
  MatTabsModule
} from "@angular/material";
import { PatternsTableComponent } from './components/patterns-table/patterns-table.component';
import { PatternDialogComponent } from './components/pattern-dialog/pattern-dialog.component';
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTabsModule,
    DragDropModule,
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
  providers: [],
  entryComponents: [PatternDialogComponent]
})
export class PatternsModule {}
