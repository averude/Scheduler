import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from './management/components/employees/components/employees-table/employees-table.component';
import { SchedulesTableComponent } from './schedules/components/schedules-table/schedules-table.component';
import { PositionsTableComponent } from './management/components/positions/components/positions-table/positions-table.component';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from '../../guards/role-guard.service';
import { ManagementComponent } from './management/management/management.component';
import { DayTypesTableComponent } from './management/components/daytypes/components/daytypes-table/daytypes-table.component';
import { ShiftsTableComponent } from './management/components/shifts/components/shifts-table/shifts-table.component';
import { PatternsComponent } from './management/components/patterns/patterns/patterns.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: {roles: ['ROLE_ADMIN']},
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
          },
          {
            path: 'daytypes',
            component: DayTypesTableComponent
          },
          {
            path: 'patterns',
            component: PatternsComponent
          },
          {
            path: 'shifts',
            component: ShiftsTableComponent
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
