import { NgModule } from '@angular/core';
import { PositionsModule } from './positions/positions.module';
import { EmployeesModule } from './employees/employees.module';
import { SchedulesModule } from './schedules/schedules.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EmployeesModule,
    PositionsModule,
    SchedulesModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent],
  exports: [],
  providers: []
})
export class AdminModule {}
