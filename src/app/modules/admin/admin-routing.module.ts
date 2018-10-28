import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from './management/components/employees/components/employees-table/employees-table.component';
import { SchedulesTableComponent } from './schedules/components/schedules-table/schedules-table.component';
import { PositionsTableComponent } from './management/components/positions/components/positions-table/positions-table.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../../auth/auth.guard';
import { ManagementComponent } from './management/management/management.component';

const routes: Routes = [
  {
    path: 'admin/:departmentId',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'management',
        component: ManagementComponent,
        children: [
          {
            path: 'employees',
            component: EmployeesTableComponent
          },
          {
            path: 'positions',
            component: PositionsTableComponent
          }
        ]
      },
      {
        path: 'schedule',
        component: SchedulesTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
