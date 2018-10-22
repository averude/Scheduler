import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from './employees/components/employees-table/employees-table.component';
import { SchedulesTableComponent } from './schedules/components/schedules-table/schedules-table.component';
import { PositionsTableComponent } from './positions/components/positions-table/positions-table.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin/:departmentId',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'schedule',
        component: SchedulesTableComponent
      },
      {
        path: 'employees',
        component: EmployeesTableComponent
      },
      {
        path: 'positions',
        component: PositionsTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
