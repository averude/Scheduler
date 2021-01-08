import { NgModule } from "@angular/core";
import { ScheduleTableModule } from "../../../../../lib/ngx-schedule-table/schedule-table.module";
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { ScheduleTableContextMenuModule } from "./schedule-table-context-menu/schedule-table-context-menu.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../../../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ScheduleGenerationService } from "../../../../../services/generators/schedule/schedule-generation.service";
import { ScheduleTablePaginationStrategy } from "../../../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { MonthYearPaginatorModule } from "../../../../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { SchedulerCellLabelSetter } from "./utils/scheduler-cell-label-setter";
import { CompositionDivider } from "../../../../../services/divider/composition-divider.service";
import { TableSumCalculator } from "../../../../../services/calculators/table-sum-calculator.service";
import { ScheduleTableCompositionDialogModule } from "./schedule-table-shift-composition-dialog/schedule-table-composition-dialog.module";
import { SchedulerUtility } from "./utils/scheduler-utility";
import { TableDataSource } from "../../../../../services/collectors/schedule/table-data-source";
import { CellEnabledSetter } from "../../../../../services/collectors/schedule/cell-enabled-setter";
import { ScheduleTableConfigurationMenuModule } from "./schedule-table-configuration-menu/schedule-table-configuration-menu.module";
import { TableDataCollector } from "../../../../../services/collectors/schedule/table-data-collector.service";
import { TableRowProcessor } from "../../../../../services/collectors/schedule/table-row-processor.service";
import { TableCompositionHandler } from "../../../../../services/collectors/schedule/table-composition-handler";
import { TableRowRemover } from "../../../../../services/collectors/schedule/table-row-remover";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MonthYearPaginatorModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ScheduleTableContextMenuModule,
    ScheduleTableModule,
    ScheduleTableCompositionDialogModule,
    ScheduleTableConfigurationMenuModule
  ],
  declarations: [
    ScheduleTableComponent
  ],
  providers: [
    ScheduleGenerationService,
    ScheduleTablePaginationStrategy,
    SchedulerCellLabelSetter,
    CompositionDivider,
    TableSumCalculator,
    TableDataCollector,
    TableRowProcessor,
    TableRowRemover,
    CellEnabledSetter,
    TableDataSource,
    TableCompositionHandler,
    SchedulerUtility
  ]
})
export class CalendarModule {}


