import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
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
  ]
})
export class SummationColumnsModule {}
