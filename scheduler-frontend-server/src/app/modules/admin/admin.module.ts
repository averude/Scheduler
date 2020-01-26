import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SimpleNotificationsModule } from "angular2-notifications";
import { StatisticsModule } from "./schedule/components/statistics/statistics.module";
import { ScheduleTabBarComponent } from './schedule/components/schedule-tab-bar/schedule-tab-bar.component';
import { ScheduleGenerationModule } from "./schedule/components/schedule-generation/schedule-generation.module";
import { ReportsModule } from "./reports/reports.module";
import { CalendarModule } from "./schedule/components/calendar/calendar.module";
import { ShiftCompositionModule } from "./schedule/components/shift-composition/shift-composition.module";
import { RemoveDialogModule } from "../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { WorkingTimeModule } from "./schedule/components/working-time/working-time.module";
import { IConfig, NgxMaskModule } from "ngx-mask";

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    ShiftCompositionModule,
    WorkingTimeModule,
    RemoveDialogModule,
    StatisticsModule,
    ScheduleGenerationModule,
    ReportsModule,
    AdminRoutingModule,
    SimpleNotificationsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AdminComponent,
    ScheduleTabBarComponent
  ],
  exports: [],
})
export class AdminModule {}
