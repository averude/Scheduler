import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftOrDepartmentAdminComponent } from './shift-or-department-admin/shift-or-department-admin.component';
import { RoleGuard } from '../../guards/role-guard.service';
import { StatisticsTableComponent } from "./schedule/components/statistics/components/statistics-table/statistics-table.component";
import { ScheduleTabBarComponent } from "./schedule/components/schedule-tab-bar/schedule-tab-bar.component";
import { ReportFormComponent } from "./reports/components/report-form/report-form.component";
import { ScheduleTableComponent } from "./schedule/components/calendar/scheduler-table-component/schedule-table.component";
import { ShiftCompositionTableComponent } from "./schedule/components/shift-composition/components/shift-composition-table/shift-composition-table.component";
import { WorkingTimeTableComponent } from "./schedule/components/working-time/components/working-time-table/working-time-table.component";

const routes: Routes = [
  {
    path: '',
    component: ShiftOrDepartmentAdminComponent,
    children: [
      {
        path: 'management',
        canActivate: [RoleGuard],
        data: {roles: ['DEPARTMENT_ADMIN']},
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
            component: ShiftCompositionTableComponent
          },
          {
            path: 'working_time',
            component: WorkingTimeTableComponent
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
