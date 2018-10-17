import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PositionsModule } from './positions/positions.module';
import { EmployeesModule } from './employees/employees.module';
import { SchedulesModule } from './schedules/schedules.module';

@NgModule({
  imports: [
    BrowserModule,
    EmployeesModule,
    PositionsModule,
    SchedulesModule
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class AdminModule {}
