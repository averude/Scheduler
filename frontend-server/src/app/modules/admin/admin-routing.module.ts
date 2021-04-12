import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { ScheduleTableComponent } from "../../components/calendar/schedule-table/schedule-table.component";
import { StatisticsTableComponent } from "../../components/statistics/statistics-table/statistics-table.component";
import { WorkingNormTableComponent } from "../../components/working-norm/working-norm-table/working-norm-table.component";
import { ReportGeneratorFormComponent } from "../../components/report-generator/report-generator-form/report-generator-form.component";
import { SecurityGuardService } from "../../guards/security-guard.service";
import { UserAccountAuthority, UserAccountRole } from "../../model/dto/user-account-dto";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'enterprise/:enterpriseId/management',
        // canActivate: [RoleGuard],
        // data: {roles: ['ENTERPRISE_ADMIN'], perm: 'ROLE_ADMIN'},
        canActivate: [SecurityGuardService],
        data: {
          authorities: [UserAccountAuthority.ENTERPRISE_ADMIN],
          roles: [UserAccountRole.ADMIN]
        },
        loadChildren: () => import('../../components/enterprise-management/enterprise-management.module')
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
            path: ':departmentId/working_norms',
            component: WorkingNormTableComponent
          },
          {
            path: ':departmentId/reports',
            component: ReportGeneratorFormComponent
          },
          {
            path: ':departmentId/management',
            // canActivate: [RoleGuard],
            // data: {roles: ['ENTERPRISE_ADMIN','DEPARTMENT_ADMIN'], perm: 'ROLE_ADMIN'},
            canActivate: [SecurityGuardService],
            data: {
              authorities: [UserAccountAuthority.ENTERPRISE_ADMIN, UserAccountAuthority.DEPARTMENT_ADMIN],
              roles: [UserAccountRole.ADMIN]
            },
            loadChildren: () => import('../../components/department-management/department-management.module')
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
