import { NgModule } from "@angular/core";
import { DepartmentDayTypesTableComponent } from './components/department-day-types-table/department-day-types-table.component';
import { DepartmentDayTypeDialogComponent } from './components/department-day-type-dialog/department-day-type-dialog.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../../../shared/shared.module";
import {
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
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
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ],
  declarations: [
    DepartmentDayTypesTableComponent,
    DepartmentDayTypeDialogComponent
  ],
  entryComponents: [DepartmentDayTypeDialogComponent]
})
export class DepartmentDayTypesModule {}
