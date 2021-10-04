import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportGeneratorFormComponent } from "./report-generator-form/report-generator-form.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReportService } from "./report.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MONTH_YEAR_DATE_FORMAT } from "../../shared/utils/utils";
import { ReportServiceConfig } from "./config/report-service-config";
import { ReportGenerator } from "./report-generator";
import { MatListModule } from "@angular/material/list";
import { CellFiller } from "./core/cell-filler";
import { MatIconModule } from "@angular/material/icon";
import { ReportDataSource } from "./data-source/report-data-source";
import { ReportsRoutingModule } from "./reports-routing.module";
import { ReportCellCollector } from "./collectors/report-cell-collector";
import {
  REPORT_COLLECTOR_HANDLERS,
  ReportDataBodyCollectorHandler,
  ReportDataHeaderCollectorHandler
} from "./collectors/collector-handlers";
import { DataCollectorModule } from "../../shared/collectors/data-collector.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataCollectorModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    ReportsRoutingModule
  ],
  declarations: [
    ReportGeneratorFormComponent
  ],
  providers: [
    MatMomentDateModule,
    ReportDataSource,
    CellFiller,
    ReportCellCollector,
    ReportServiceConfig,
    ReportService,
    ReportGenerator,
    {provide: MAT_DATE_FORMATS, useValue: MONTH_YEAR_DATE_FORMAT},
    {provide: REPORT_COLLECTOR_HANDLERS, useClass: ReportDataHeaderCollectorHandler, multi: true},
    {provide: REPORT_COLLECTOR_HANDLERS, useClass: ReportDataBodyCollectorHandler, multi: true}
  ]
})
export class ReportsModule { }
