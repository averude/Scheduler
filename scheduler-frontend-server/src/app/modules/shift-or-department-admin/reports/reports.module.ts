import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFormComponent } from "./components/report-form/report-form.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReportGenerator } from "../../../services/generators/report/report-generator";
import { ReportDataCollector } from "../../../services/generators/report/collector/report-data-collector";
import { ReportService } from "../../../services/generators/report/report.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DATE_FORMATS } from "@angular/material/core";

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    ReportFormComponent
  ],
  providers: [
    MatMomentDateModule,
    ReportService,
    ReportGenerator,
    ReportDataCollector,
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ReportsModule { }
