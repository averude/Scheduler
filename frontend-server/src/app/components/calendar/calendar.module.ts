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
import { ScheduleTablePaginationStrategy } from "../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { MonthYearPaginatorModule } from "../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { ScheduleCellLabelPipe } from "./utils/schedule-cell-label-pipe";
import { IntervalCreator } from "../../services/creator/interval-creator.service";
import { TableSumCalculator } from "../../services/calculators/table-sum-calculator.service";
import { ScheduleTableCompositionDialogModule } from "./schedule-table-shift-composition-dialog/schedule-table-composition-dialog.module";
import { SchedulerUtility } from "./utils/scheduler-utility";
import { ScheduleTableDataSource } from "./data-sources/schedule-table.data-source";
import { CellEnabledSetter } from "../../services/collectors/schedule/cell-enabled-setter";
import { ScheduleTableConfigurationMenuModule } from "./schedule-table-configuration-menu/schedule-table-configuration-menu.module";
import { TableDataCollector } from "../../services/collectors/schedule/table-data.collector";
import { TableRowProcessor } from "../../services/collectors/schedule/table-row-processor.service";
import { TableCompositionHandler } from "../../services/collectors/schedule/table-composition-handler";
import { TableRowRemover } from "../../services/collectors/schedule/table-row-remover";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TableManager } from "../../services/collectors/schedule/table-manager";
import { TableCellComponent } from "./table-cell/table-cell.component";
import { NameInfoCellModule } from "../shared/name-info-cell/name-info-cell.module";
import { ScheduleViewTableComponent } from "./schedule-view-table/schedule-view-table.component";
import { UIPrioritySortingStrategy } from "./utils/ui-priority-sorting-strategy";

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
    ScheduleTableCompositionDialogModule,
    ScheduleTableConfigurationMenuModule
  ],
  declarations: [
    ScheduleTableComponent,
    ScheduleViewTableComponent,
    TableCellComponent
  ],
  providers: [
    ScheduleGenerationService,
    ScheduleTablePaginationStrategy,
    ScheduleCellLabelPipe,
    IntervalCreator,
    TableSumCalculator,
    TableDataCollector,
    TableRowProcessor,
    TableRowRemover,
    CellEnabledSetter,
    ScheduleTableDataSource,
    TableManager,
    TableCompositionHandler,
    SchedulerUtility,
    UIPrioritySortingStrategy
  ]
})
export class CalendarModule {

  constructor(s: ScheduleCellLabelPipe) {
  }
}


