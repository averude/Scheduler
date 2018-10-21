import { NgModule } from '@angular/core';
import { PositionsModule } from './positions/positions.module';
import { EmployeesModule } from './employees/employees.module';
import { SchedulesModule } from './schedules/schedules.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    EmployeesModule,
    PositionsModule,
    SchedulesModule
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class AdminModule {}
