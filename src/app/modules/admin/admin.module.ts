import { NgModule } from '@angular/core';
import { SchedulesModule } from './schedules/schedules.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManagementModule } from './management/management.module';
import { MatToolbarModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SimpleNotificationsModule } from "angular2-notifications";
import { OPTIONS } from "./notification-options";

@NgModule({
  imports: [
    CommonModule,
    ManagementModule,
    SchedulesModule,
    AdminRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(OPTIONS)
  ],
  declarations: [AdminComponent],
  exports: [],
  providers: []
})
export class AdminModule {}
