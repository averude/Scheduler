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
  MatTableModule
} from "@angular/material";
import { DepartmentIconsTableComponent } from './components/department-icons-table/department-icons-table.component';
import { DepartmentIconsDialogComponent } from './components/department-icons-dialog/department-icons-dialog.component';

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
  declarations: [
    DepartmentIconsTableComponent,
    DepartmentIconsDialogComponent
  ],
  entryComponents: [DepartmentIconsDialogComponent]
})
export class DepartmentIconsModule {}
