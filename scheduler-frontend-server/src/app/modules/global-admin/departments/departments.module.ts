import { NgModule } from "@angular/core";
import { DepartmentsTableComponent } from "./components/departments-table/departments-table.component";
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
  MatTableModule
} from "@angular/material";
import { DepartmentDialogComponent } from './components/department-dialog/department-dialog.component';

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
    ReactiveFormsModule
  ],
  declarations: [DepartmentsTableComponent, DepartmentDialogComponent],
  exports: [DepartmentsTableComponent],
  entryComponents: [DepartmentDialogComponent]
})
export class DepartmentsModule {}
