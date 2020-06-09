import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
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
import { NgxMaskModule } from "ngx-mask";
import { SummationColumnsTableComponent } from "./components/summation-columns-table/summation-columns-table.component";
import { SummationColumnDialogComponent } from "./components/summation-column-dialog/summation-column-dialog.component";
import { SummationRangeUnitComponent } from "./components/summation-range-unit/summation-range-unit.component";
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
    NgxMaskModule.forChild()
  ],
  declarations: [
    SummationColumnsTableComponent,
    SummationColumnDialogComponent,
    SummationRangeUnitComponent
  ],
  entryComponents: [SummationColumnDialogComponent]
})
export class SummationColumnsModule {}
