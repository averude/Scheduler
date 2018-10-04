import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesComponent} from './components/employees/employees.component';
import {SchedulesComponent} from './components/schedules/schedules.component';
import {PositionsComponent} from './components/positions/positions.component';

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'positions', component: PositionsComponent },
  { path: 'schedule', component: SchedulesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
