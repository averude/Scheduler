import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulesTableComponent } from './calendar/components/schedules-table/schedules-table.component';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from '../../guards/role-guard.service';
import { StatisticsTableComponent } from "./statistics/components/statistics-table/statistics-table.component";
import { ScheduleTabBarComponent } from "./schedule-tab-bar/schedule-tab-bar.component";

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
