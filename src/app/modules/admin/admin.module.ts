import { NgModule } from '@angular/core';
import { SchedulesModule } from './schedule/components/calendar/schedules.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SimpleNotificationsModule } from "angular2-notifications";
import { StatisticsModule } from "./schedule/components/statistics/statistics.module";
import { ScheduleTabBarComponent } from './schedule/components/schedule-tab-bar/schedule-tab-bar.component';
import { ScheduleGenerationModule } from "./schedule/components/schedule-generation/schedule-generation.module";
import { ReportsModule } from "./reports/reports.module";

@NgModule({
  imports: [
    CommonModule,
    SchedulesModule,
    StatisticsModule,
    ScheduleGenerationModule,
    ReportsModule,
    AdminRoutingModule,
    SimpleNotificationsModule
  ],
  declarations: [
    AdminComponent,
    ScheduleTabBarComponent
  ],
  exports: [],
})
export class AdminModule {}
