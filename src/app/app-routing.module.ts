import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from './modules/admin/employees/components/employees-table/employees-table.component';
import { PositionsTableComponent } from './modules/admin/positions/components/positions-table/positions-table.component';
import { SchedulesTableComponent } from './modules/admin/schedules/components/schedules-table/schedules-table.component';

const routes: Routes = [
  { path: 'employees', component: EmployeesTableComponent },
  { path: 'positions', component: PositionsTableComponent },
  { path: 'schedule', component: SchedulesTableComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
