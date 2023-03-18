import { NgModule } from "@angular/core";
import { ScheduleTableModule } from "../../lib/ngx-schedule-table/schedule-table.module";
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { ScheduleTableContextMenuModule } from "./components/schedule-table-context-menu/schedule-table-context-menu.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ScheduleGenerationService } from "./service/schedule-generation.service";
import { MonthYearPaginatorModule } from "../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { ScheduleCellLabelPipe } from "./utils/schedule-cell-label-pipe";
import { ScheduleTableCompositionManagementModule } from "./components/schedule-table-composition-management/schedule-table-composition-management.module";
import { SchedulerUtility } from "./utils/scheduler-utility";
import { ScheduleTableDataSource } from "./data-sources/schedule-table.data-source";
import { ScheduleTableConfigurationMenuModule } from "./components/schedule-table-configuration-menu/schedule-table-configuration-menu.module";
import { TableCellComponent } from "./components/table-cell/table-cell.component";
import { NameInfoCellModule } from "../shared/name-info-cell/name-info-cell.module";
import { TableFilterModule } from "./components/table-filter/table-filter.module";
import { CalendarContainerModule } from "../../lib/calendar-container/calendar-container.module";
import { TableCollectorModule } from "./collector/table-collector.module";
import { SecurityConfiguration } from "./data-sources/security/security-configuration";
import { DataSourceFacade } from "./data-sources/data-source.facade";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MonthYearPaginatorModule,
    MatFormFieldModule,
    CalendarContainerModule,
    MatInputModule,
    NameInfoCellModule,
    ScheduleTableContextMenuModule,
    ScheduleTableModule,
    TableFilterModule,
    ScheduleTableCompositionManagementModule,
    ScheduleTableConfigurationMenuModule,
    TableCollectorModule
  ],
  declarations: [
    ScheduleTableComponent,
    TableCellComponent
  ],
  providers: [
    SecurityConfiguration,
    ScheduleGenerationService,
    ScheduleCellLabelPipe,
    ScheduleTableDataSource,
    DataSourceFacade,
    SchedulerUtility,
  ]
})
export class CalendarModule {}


