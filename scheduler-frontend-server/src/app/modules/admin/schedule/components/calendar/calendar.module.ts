import { NgModule } from "@angular/core";
import { ScheduleTableModule } from "../../../../../lib/ngx-schedule-table/schedule-table.module";
import { SchedulerTableComponent } from './scheduler-table-component/scheduler-table.component';
import { ScheduleTableContextMenuModule } from "./schedule-table-context-menu/schedule-table-context-menu.module";
import { ScheduleExportExcelComponent } from "./schedule-export-excel/schedule-export-excel.component";
import { ScheduleGenerationModule } from "../schedule-generation/schedule-generation.module";
import { ShowHoursControlComponent } from "./show-hours-control/show-hours-control.component";
import { MonthYearPaginatorComponent } from "../../../../../shared/paginators/month-year-paginator/month-year-paginator.component";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { SharedModule } from "../../../../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ScheduleGenerationDialogComponent } from "../schedule-generation/components/schedule-generation-dialog/schedule-generation-dialog.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ScheduleGenerationModule,
    ScheduleTableContextMenuModule,
    ScheduleTableModule.forRoot(null)
  ],
  declarations: [
    ShowHoursControlComponent,
    SchedulerTableComponent,
    ScheduleExportExcelComponent,
    MonthYearPaginatorComponent,
  ],
  entryComponents: [ScheduleGenerationDialogComponent],
})
export class CalendarModule {
}
