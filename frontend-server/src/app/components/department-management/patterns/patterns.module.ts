import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PatternUnitComponent } from './pattern-unit/pattern-unit.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { PatternsTableComponent } from './patterns-table/patterns-table.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgxMaskModule } from "ngx-mask";
import { PatternRuleComponent } from './pattern-rule/pattern-rule.component';
import { ShiftPatternDialogComponent } from './shift-pattern-dialog/shift-pattern-dialog.component';

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
    NgxMaskModule.forChild()
  ],
  declarations: [
    PatternUnitComponent,
    PatternsTableComponent,
    PatternRuleComponent,
    ShiftPatternDialogComponent
  ],
  providers: []
})
export class PatternsModule {}
