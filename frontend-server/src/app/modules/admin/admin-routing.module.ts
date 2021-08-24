import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { ScheduleTableComponent } from "../../components/calendar/schedule-table/schedule-table.component";
import { StatisticsTableComponent } from "../../components/statistics/statistics-table/statistics-table.component";
import { ReportGeneratorFormComponent } from "../../components/report-generator/report-generator-form/report-generator-form.component";
import { LevelRoleGuard } from "../../guards/level-role.guard";
import { UserAccountLevel, UserAccountRole } from "../../model/dto/user-account-dto";
import { ScheduleViewTableComponent } from "../../components/calendar/schedule-view-table/schedule-view-table.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'enterprise/:enterpriseId/management',
        canActivate: [LevelRoleGuard],
        data: {
          levels: [UserAccountLevel.ENTERPRISE],
          roles: [UserAccountRole.ADMIN]
        },
        loadChildren: () => import('../../components/management/enterprise/enterprise-management.module')
          .then(mod => mod.EnterpriseManagementModule)
      },
      {
        path: 'department',
        children: [
          {
            path: ':departmentId/calendar',
            component: ScheduleTableComponent
          },
          {
            path: ':departmentId/statistics',
            component: StatisticsTableComponent
          },
          {
            path: ':departmentId/view/:viewId',
            component: ScheduleViewTableComponent
          },
          {
            path: ':departmentId/working_norms',
            canActivate: [LevelRoleGuard],
            data: {
              levels: [
                UserAccountLevel.ENTERPRISE,
                UserAccountLevel.DEPARTMENT
              ],
              roles: [UserAccountRole.ADMIN]
            },
            loadChildren: () => import('../../components/working-norm/working-norm.module')
              .then(mod => mod.WorkingNormModule)
          },
          {
            path: ':departmentId/reports',
            component: ReportGeneratorFormComponent
          },
          {
            path: ':departmentId/management',
            canActivate: [LevelRoleGuard],
            data: {
              levels: [
                UserAccountLevel.ENTERPRISE,
                UserAccountLevel.DEPARTMENT
              ],
              roles: [UserAccountRole.ADMIN]
            },
            loadChildren: () => import('../../components/management/department/department-management.module')
              .then(mod => mod.DepartmentManagementModule)
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
