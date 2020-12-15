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
import { ShiftCompositionDivider } from "../../../../../services/divider/shift-composition-divider";
import { TableSumCalculator } from "../../../../../services/calculators/table-sum-calculator.service";
import { MainShiftCompositionDialogModule } from "./main-shift-composition-dialog/main-shift-composition-dialog.module";
import { SchedulerUtility } from "./utils/scheduler-utility";
import { TableTreeDataCollector } from "../../../../../services/collectors/schedule/table-tree-data-collector";
import { TableDataSource } from "../../../../../services/collectors/schedule/table-data-source";
import { CellEnabledSetter } from "../../../../../services/collectors/schedule/cell-enabled-setter";
import { ScheduleTableConfigurationMenuModule } from "./schedule-table-configuration-menu/schedule-table-configuration-menu.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MonthYearPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ScheduleTableContextMenuModule,
    ScheduleTableModule,
    MainShiftCompositionDialogModule,
    ScheduleTableConfigurationMenuModule
  ],
  declarations: [
    ScheduleTableComponent
  ],
  providers: [
    ScheduleGenerationService,
    ScheduleTablePaginationStrategy,
    SchedulerCellLabelSetter,
    ShiftCompositionDivider,
    TableSumCalculator,
    TableTreeDataCollector,
    CellEnabledSetter,
    TableDataSource,
    SchedulerUtility
  ]
})
export class CalendarModule {}


