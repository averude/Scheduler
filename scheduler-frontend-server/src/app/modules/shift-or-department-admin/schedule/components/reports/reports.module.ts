import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFormComponent } from "./components/report-form/report-form.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReportService } from "../../../../../services/generators/report/report.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MONTH_YEAR_DATE_FORMAT } from "../../../../../shared/utils/utils";
import { ReportServiceConfig } from "../../../../../services/generators/report/config/report-service-config";
import { ReportGenerator } from "../../../../../services/generators/report/report-generator";
import { MatListModule } from "@angular/material/list";

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
    MatCardModule,
    MatListModule
  ],
  declarations: [
    ReportFormComponent
  ],
  providers: [
    MatMomentDateModule,
    ReportServiceConfig,
    ReportService,
    ReportGenerator,
    {provide: MAT_DATE_FORMATS, useValue: MONTH_YEAR_DATE_FORMAT},
  ]
})
export class ReportsModule { }
