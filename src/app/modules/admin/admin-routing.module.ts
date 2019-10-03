import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulesTableComponent } from './schedule/components/calendar/components/schedules-table/schedules-table.component';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from '../../guards/role-guard.service';
import { StatisticsTableComponent } from "./schedule/components/statistics/components/statistics-table/statistics-table.component";
import { ScheduleTabBarComponent } from "./schedule/components/schedule-tab-bar/schedule-tab-bar.component";
import { ReportFormComponent } from "./reports/components/report-form/report-form.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
            component: SchedulesTableComponent
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
export class AdminRoutingModule {}
