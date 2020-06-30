import { NgModule } from "@angular/core";
import { DepartmentsTableComponent } from "./components/departments-table/departments-table.component";
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
  exports: [DepartmentsTableComponent]
})
export class DepartmentsModule {}
