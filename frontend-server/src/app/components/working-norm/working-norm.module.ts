import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ScheduleTableModule } from "../../lib/ngx-schedule-table/schedule-table.module";
import { MonthYearPaginatorModule } from "../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { WorkingNormTableComponent } from "./working-norm-table/working-norm-table.component";
import { WorkingNormDialogComponent } from './working-norm-dialog/working-norm-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { AvrEntityGenerationModule } from "../../lib/avr-entity-generation/avr-entity-generation.module";
import { TableSumCalculator } from "../../services/calculators/table-sum-calculator.service";
import { WorkingNormTableConfigurationMenuModule } from "./working-norm-table-configuration-menu/working-norm-table-configuration-menu.module";
import { NameInfoCellModule } from "../shared/name-info-cell/name-info-cell.module";
import { WorkingNormDataSource } from "./data-source/working-norm.data-source";
import { WorkingNormRoutingModule } from "./working-norm-routing.module";
import { CalendarContainerModule } from "../../lib/calendar-container/calendar-container.module";
import { CellUpdater } from "../../services/updater/cell-updater";
import { WorkingNormCollectorModule } from "./collector/working-norm-collector.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    WorkingNormCollectorModule,
    AvrEntityGenerationModule,
    ReactiveFormsModule,
    ScheduleTableModule,
    WorkingNormTableConfigurationMenuModule,
    MonthYearPaginatorModule,
    MatDialogModule,
    CalendarContainerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NameInfoCellModule,
    WorkingNormRoutingModule
  ],
  declarations: [
    WorkingNormTableComponent,
    WorkingNormDialogComponent
  ],
  providers: [
    WorkingNormDataSource,
    TableSumCalculator,
    CellUpdater
  ]
})
export class WorkingNormModule {}
