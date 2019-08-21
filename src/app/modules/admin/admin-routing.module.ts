import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulesTableComponent } from './schedules/components/schedules-table/schedules-table.component';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from '../../guards/role-guard.service';
import { ManagementComponent } from './management/management/management.component';
import { EmployeesTableComponent } from "./management/components/employees/components/employees-table/employees-table.component";
import { PositionsTableComponent } from "./management/components/positions/components/positions-table/positions-table.component";
import { DayTypesTableComponent } from "./management/components/daytypes/components/daytypes-table/daytypes-table.component";
import { ShiftsTableComponent } from "./management/components/shifts/components/shifts-table/shifts-table.component";
import { PatternsTableComponent } from "./management/components/patterns/components/patterns-table/patterns-table.component";
import { HolidaysTableComponent } from "./management/components/holidays/components/holidays-table/holidays-table.component";
import { WorkingTimeTableComponent } from "./management/components/working-time/components/working-time-table/working-time-table.component";
import { ExtraWeekendsTableComponent } from "./management/components/extra-weekends/components/extra-weekends-table/extra-weekends-table.component";
import { StatisticsTableComponent } from "./statistics/components/statistics-table/statistics-table.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: {roles: ['DEPARTMENT_ADMIN', 'SHIFT_ADMIN']},
    children: [
      {
        path: 'management',
        component: ManagementComponent,
        canActivate: [RoleGuard],
        data: {roles: ['DEPARTMENT_ADMIN']},
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
            component: PatternsTableComponent
          },
          {
            path: 'shifts',
            component: ShiftsTableComponent
          },
          {
            path: 'holidays',
            component: HolidaysTableComponent
          },
          {
            path: 'workingtime',
            component: WorkingTimeTableComponent
          },
          {
            path: 'extraweekends',
            component: ExtraWeekendsTableComponent
          }
        ]
      },
      {
        path: 'schedule',
        component: SchedulesTableComponent
      },
      {
        path: 'statistics',
        component: StatisticsTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
