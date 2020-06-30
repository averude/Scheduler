import { NgModule } from "@angular/core";
import { DayTypeGroupsTableComponent } from "./components/day-type-groups-table/day-type-groups-table.component";
import { DayTypeGroupsDialogComponent } from "./components/day-type-groups-dialog/day-type-groups-dialog.component";
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
    DayTypeGroupsTableComponent,
    DayTypeGroupsDialogComponent
  ]
})
export class DayTypeGroupsModule { }
