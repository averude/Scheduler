import { NgModule } from "@angular/core";
import { ScheduleTableModule } from "../../../../../lib/ngx-schedule-table/schedule-table.module";
import { SchedulerTableComponent } from './scheduler-table-component/scheduler-table.component';
import { ScheduleTableContextMenuModule } from "./schedule-table-context-menu/schedule-table-context-menu.module";
import { ScheduleExportExcelComponent } from "./schedule-export-excel/schedule-export-excel.component";
import { ShowHoursControlComponent } from "./show-hours-control/show-hours-control.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../../../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ScheduleGenerationService } from "../../../../../services/generators/schedule-generation.service";
import { ScheduleTablePaginationStrategy } from "../../../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { MonthYearPaginatorModule } from "../../../../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { SchedulerCellLabelSetter } from "./utils/scheduler-cell-label-setter";
import { AvrEntityGenerationModule } from "../../../../../lib/avr-entity-generation/avr-entity-generation.module";
import { ScheduleTableDataCollector } from "./collectors/schedule-table-data-collector";
import { ShiftCompositionDivider } from "../../../../../services/divider/shift-composition-divider";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AvrEntityGenerationModule,
    SharedModule,
    MonthYearPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ScheduleTableContextMenuModule,
    ScheduleTableModule
  ],
  declarations: [
    ShowHoursControlComponent,
    SchedulerTableComponent,
    ScheduleExportExcelComponent
  ],
  providers: [
    ScheduleGenerationService,
    ScheduleTablePaginationStrategy,
    SchedulerCellLabelSetter,
    ShiftCompositionDivider,
    ScheduleTableDataCollector,
  ],
  entryComponents: [],
})
export class CalendarModule {}


