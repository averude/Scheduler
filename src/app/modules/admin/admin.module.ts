import { NgModule } from '@angular/core';
import { SchedulesModule } from './calendar/schedules.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SimpleNotificationsModule } from "angular2-notifications";
import { StatisticsModule } from "./statistics/statistics.module";
import { ScheduleTabBarComponent } from './schedule-tab-bar/schedule-tab-bar.component';

@NgModule({
  imports: [
    CommonModule,
    SchedulesModule,
    StatisticsModule,
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
