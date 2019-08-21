import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { DayTypesTableComponent } from './components/daytypes-table/daytypes-table.component';
import { DayTypeDialogComponent } from './components/daytype-dialog/daytype-dialog.component';
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
    DayTypesTableComponent,
    DayTypeDialogComponent
  ],
  entryComponents: [DayTypeDialogComponent]
})
export class DayTypesModule {}
