import { NgModule } from "@angular/core";
import { DepartmentDayTypesTableComponent } from './department-day-types-table/department-day-types-table.component';
import { DepartmentDayTypeDialogComponent } from './department-day-type-dialog/department-day-type-dialog.component';
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
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
  ]
})
export class DepartmentDayTypesModule {}
