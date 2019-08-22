import { NgModule } from "@angular/core";
import { DayTypeGroupsTableComponent } from "./components/day-type-groups-table/day-type-groups-table.component";
import { DayTypeGroupsDialogComponent } from "./components/day-type-groups-dialog/day-type-groups-dialog.component";
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
  ],
  entryComponents: [DayTypeGroupsDialogComponent]
})
export class DayTypeGroupsModule { }
