import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../../../shared/shared.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from "@angular/material-moment-adapter";
import { ShiftCompositionTableComponent } from './components/shift-composition-table/shift-composition-table.component';
import { ShiftCompositionDialogComponent } from './components/shift-composition-dialog/shift-composition-dialog.component';

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
    ShiftCompositionTableComponent,
    ShiftCompositionDialogComponent
  ],
  providers: [
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    }
  ]
})
export class ShiftCompositionModule {
}
