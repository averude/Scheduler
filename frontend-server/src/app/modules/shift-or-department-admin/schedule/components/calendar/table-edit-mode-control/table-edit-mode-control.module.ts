import { NgModule } from "@angular/core";
import { MainShiftCompositionDialogComponent } from "./components/main-shift-composition-dialog/main-shift-composition-dialog.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../../../../shared/shared.module";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { TableEditModeControlComponent } from './components/table-edit-mode-control/table-edit-mode-control.component';

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
    MainShiftCompositionDialogComponent,
    TableEditModeControlComponent
  ],
  exports: [
    TableEditModeControlComponent
  ]
})
export class TableEditModeControl {
}
