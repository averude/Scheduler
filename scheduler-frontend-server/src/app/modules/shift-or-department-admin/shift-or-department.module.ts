import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftOrDepartmentAdminComponent } from './shift-or-department-admin/shift-or-department-admin.component';
import { ShiftOrDepartmentAdmin } from './shift-or-department-admin.module';
import { SimpleNotificationsModule } from "angular2-notifications";
import { StatisticsModule } from "./schedule/components/statistics/statistics.module";
import { ScheduleTabBarComponent } from './schedule/components/schedule-tab-bar/schedule-tab-bar.component';
import { ReportsModule } from "./reports/reports.module";
import { CalendarModule } from "./schedule/components/calendar/calendar.module";
import { ShiftCompositionModule } from "./schedule/components/shift-composition/shift-composition.module";
import { RemoveDialogModule } from "../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { WorkingTimeModule } from "./schedule/components/working-time/working-time.module";
import { NgxMaskModule } from "ngx-mask";
import { AvrTopBarModule } from "../../lib/avr-top-bar/avr-top-bar.module";

@NgModule({
  imports: [
    CommonModule,
    AvrTopBarModule,
    CalendarModule,
    ShiftCompositionModule,
    WorkingTimeModule,
    RemoveDialogModule,
    StatisticsModule,
    ReportsModule,
    ShiftOrDepartmentAdmin,
    SimpleNotificationsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ShiftOrDepartmentAdminComponent,
    ScheduleTabBarComponent
  ],
  exports: [],
})
export class ShiftOrDepartmentModule {}
