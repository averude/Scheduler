import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftOrDepartmentAdminComponent } from './shift-or-department-admin/shift-or-department-admin.component';
import { RoleGuard } from '../../guards/role-guard.service';
import { StatisticsTableComponent } from "./schedule/components/statistics/components/statistics-table/statistics-table.component";
import { ScheduleTabBarComponent } from "./schedule/components/schedule-tab-bar/schedule-tab-bar.component";
import { ReportFormComponent } from "./schedule/components/reports/components/report-form/report-form.component";
import { ScheduleTableComponent } from "./schedule/components/calendar/schedule-table-component/schedule-table.component";
import { MainShiftCompositionTableComponent } from "./schedule/components/shift-composition/components/main-shift-composition-table/main-shift-composition-table.component";
import { WorkingNormTableComponent } from "./schedule/components/working-time/components/working-time-table/working-norm-table.component";

const routes: Routes = [
  {
    path: '',
    component: ShiftOrDepartmentAdminComponent,
    children: [
      {
        path: 'management',
        canActivate: [RoleGuard],
        data: {roles: ['DEPARTMENT_ADMIN'], perm: 'ROLE_ADMIN'},
        loadChildren: () => import('./management/management.module')
          .then(mod => mod.ManagementModule)
      },
      {
        path: 'schedule',
        component: ScheduleTabBarComponent,
        children: [
          {
            path: 'calendar',
            component: ScheduleTableComponent
          },
          {
            path: 'compositions',
            component: MainShiftCompositionTableComponent
          },
          {
            path: 'working_norm',
            component: WorkingNormTableComponent
          },
          {
            path: 'statistics',
            component: StatisticsTableComponent
          },
          {
            path: 'reports',
            component: ReportFormComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftOrDepartmentAdmin {}
