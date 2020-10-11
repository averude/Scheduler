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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  declarations: [
    ReportFormComponent
  ],
  providers: [
    MatMomentDateModule,
    ReportService,
    ReportGenerator,
    ReportDataCollector
  ]
})
export class ReportsModule { }
