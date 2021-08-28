import { NgModule } from "@angular/core";
import { ScheduleTableModule } from "../../lib/ngx-schedule-table/schedule-table.module";
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { ScheduleTableContextMenuModule } from "./schedule-table-context-menu/schedule-table-context-menu.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ScheduleGenerationService } from "../../services/generators/schedule/schedule-generation.service";
import { MonthYearPaginatorModule } from "../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { ScheduleCellLabelPipe } from "./utils/schedule-cell-label-pipe";
import { IntervalCreator } from "../../services/creator/interval-creator.service";
import { TableSumCalculator } from "../../services/calculators/table-sum-calculator.service";
import { ScheduleTableCompositionManagementModule } from "./schedule-table-composition-management/schedule-table-composition-management.module";
import { SchedulerUtility } from "./utils/scheduler-utility";
import { ScheduleTableDataSource } from "./data-sources/schedule-table.data-source";
import { CellEnabledSetter } from "../../services/collectors/schedule/cell-enabled-setter";
import { ScheduleTableConfigurationMenuModule } from "./schedule-table-configuration-menu/schedule-table-configuration-menu.module";
import { TableDataCollector } from "../../services/collectors/schedule/table-data.collector";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TableCellComponent } from "./table-cell/table-cell.component";
import { NameInfoCellModule } from "../shared/name-info-cell/name-info-cell.module";
import { ScheduleViewTableComponent } from "./schedule-view-table/schedule-view-table.component";
import { UIPrioritySortingStrategy } from "./utils/ui-priority-sorting-strategy";
import { TableRowFiller } from "../../services/collectors/schedule/table-row-filler";
import { TableFilterModule } from "./table-filter/table-filter.module";
import { ScheduleFilteringStrategy } from "./utils/schedule-filtering-strategy";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MonthYearPaginatorModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    NameInfoCellModule,
    ScheduleTableContextMenuModule,
    ScheduleTableModule,
    TableFilterModule,
    ScheduleTableCompositionManagementModule,
    ScheduleTableConfigurationMenuModule
  ],
  declarations: [
    ScheduleTableComponent,
    ScheduleViewTableComponent,
    TableCellComponent
  ],
  providers: [
    ScheduleGenerationService,
    ScheduleCellLabelPipe,
    IntervalCreator,
    TableSumCalculator,
    TableDataCollector,
    TableRowFiller,
    CellEnabledSetter,
    ScheduleTableDataSource,
    SchedulerUtility,
    UIPrioritySortingStrategy,
    ScheduleFilteringStrategy
  ]
})
export class CalendarModule {}


