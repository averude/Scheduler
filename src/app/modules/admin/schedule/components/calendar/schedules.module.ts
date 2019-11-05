import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { SchedulesTableComponent } from './components/schedules-table/schedules-table.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MonthYearPaginatorComponent } from "../../../../../shared/paginators/month-year-paginator/month-year-paginator.component";
import { TableShiftGroupComponent } from './components/table-shift-group/table-shift-group.component';
import { PaginatorService } from "../../../../../shared/paginators/paginator.service";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { SelectableRowDirective } from "../../../../../shared/directives/selectable-row.directive";
import { ShowHoursControlComponent } from './components/show-hours-control/show-hours-control.component';
import { ShowHoursService } from "./components/show-hours-control/show-hours.service";
import { ScheduleGenerationModule } from "../schedule-generation/schedule-generation.module";
import { ScheduleGenerationDialogComponent } from "../schedule-generation/components/schedule-generation-dialog/schedule-generation-dialog.component";
import { ScheduleExportExcelComponent } from './components/schedule-export-excel/schedule-export-excel.component';
import { ScheduleTableContextMenuModule } from "./components/schedule-table-context-menu/schedule-table-context-menu.module";
import { ScheduleTableUtils } from "./utils/schedule-table-utils";
import { ScheduleTableStatUtils } from "./utils/schedule-table-stat-utils";
import { DataTransformer } from "./utils/data-transformer";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ScheduleGenerationModule,
    ScheduleTableContextMenuModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    SchedulesTableComponent,
    MonthYearPaginatorComponent,
    TableRowComponent,
    TableHeaderComponent,
    TableCellComponent,
    TableShiftGroupComponent,
    SelectableRowDirective,
    ShowHoursControlComponent,
    ScheduleExportExcelComponent
  ],
  entryComponents: [ScheduleGenerationDialogComponent],
  providers: [
    PaginatorService,
    ShowHoursService,
    ScheduleTableUtils,
    ScheduleTableStatUtils,
    DataTransformer
  ]
})
export class SchedulesModule {}
