import { NgModule } from '@angular/core';
import { SchedulesModule } from './schedules/schedules.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManagementModule } from './management/management.module';

@NgModule({
  imports: [
    CommonModule,
    ManagementModule,
    SchedulesModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent],
  exports: [],
  providers: []
})
export class AdminModule {}
