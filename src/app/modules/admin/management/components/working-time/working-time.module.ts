import { NgModule } from "@angular/core";
import { WorkingTimeTableComponent } from './components/working-time-table/working-time-table.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../../../shared/shared.module";
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import { WorkingTimeDialogComponent } from './components/working-time-dialog/working-time-dialog.component';
import { RemoveDialogComponent } from "../../../../../shared/abstract-components/remove-dialog/remove-dialog.component";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from "@angular/material-moment-adapter";

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
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule
  ],
  declarations: [
    WorkingTimeTableComponent,
    WorkingTimeDialogComponent
  ],
  entryComponents: [
    WorkingTimeDialogComponent,
    RemoveDialogComponent
  ],
  providers: [
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    }
  ]
})
export class WorkingTimeModule {}
