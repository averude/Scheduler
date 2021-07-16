import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from "@angular/material-moment-adapter";
import { EditCompositionsDialogComponent } from './edit-compositions-dialog/edit-compositions-dialog.component';
import { AddSubstitutionCompositionDialogComponent } from './add-substitution-composition-dialog/add-substitution-composition-dialog.component';
import { SidePanelStepperModule } from "../../../lib/side-panel-stepper/side-panel-stepper.module";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { AddMainCompositionDialogComponent } from "./add-main-composition-dialog/add-main-composition-dialog.component";

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
    ReactiveFormsModule,
    SidePanelStepperModule,
    CdkStepperModule,
  ],
  declarations: [
    // AddMainShiftCompositionDialogComponent,
    AddMainCompositionDialogComponent,
    EditCompositionsDialogComponent,
    AddSubstitutionCompositionDialogComponent,
  ],
  providers: [
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    }
  ]
})
export class ScheduleTableCompositionDialogModule {}
