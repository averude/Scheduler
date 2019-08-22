import { NgModule } from '@angular/core';
import { SchedulesModule } from './calendar/schedules.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManagementModule } from './management/management.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SimpleNotificationsModule } from "angular2-notifications";
import { OPTIONS } from "./notification-options";
import { StatisticsModule } from "./statistics/statistics.module";
import { ScheduleTabBarComponent } from './schedule-tab-bar/schedule-tab-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ManagementModule,
    SchedulesModule,
    StatisticsModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(OPTIONS)
  ],
  declarations: [AdminComponent, ScheduleTabBarComponent],
  exports: [],
})
export class AdminModule {}
