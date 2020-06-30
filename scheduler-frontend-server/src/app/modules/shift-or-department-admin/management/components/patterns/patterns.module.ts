import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PatternUnitComponent } from './components/pattern-unit/pattern-unit.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { PatternsTableComponent } from './components/patterns-table/patterns-table.component';
import { PatternDialogComponent } from './components/pattern-dialog/pattern-dialog.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgxMaskModule } from "ngx-mask";

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
    PatternDialogComponent
  ],
  providers: []
})
export class PatternsModule {}
