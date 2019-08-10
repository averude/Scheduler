import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RoleGuard } from "../../guards/role-guard.service";
import { GlobalAdminComponent } from "./global-admin/global-admin.component";
import { DepartmentsTableComponent } from "./departments/components/departments-table/departments-table.component";
import { UserAccountsTableComponent } from "./accounts/components/user-accounts-table/user-accounts-table.component";
import { DepartmentIconsTableComponent } from "./department-icons/components/department-icons-table/department-icons-table.component";

const routes = [
  {
    path: 'global_admin',
    component: GlobalAdminComponent,
    canActivate: [RoleGuard],
    data: {roles: ['GLOBAL_ADMIN']},
    children: [
      {
        path: 'departments',
        component: DepartmentsTableComponent
      },
      {
        path: 'icons',
        component: DepartmentIconsTableComponent
      },
      {
        path: 'accounts',
        component: UserAccountsTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalAdminRoutingModule {}
