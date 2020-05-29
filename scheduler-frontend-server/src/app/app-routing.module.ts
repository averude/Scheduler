import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { LoginComponent } from './modules/login/login.component';
import { RoleGuard } from "./guards/role-guard.service";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'global_admin',
    canActivate: [RoleGuard],
    data: {roles: ['GLOBAL_ADMIN']},
    loadChildren: () => import('./modules/global_admin/global-admin.module')
      .then(mod => mod.GlobalAdminModule)
  },
  {
    path: 'enterprise_admin',
    canActivate: [RoleGuard],
    data: {roles: ['ENTERPRISE_ADMIN']},
    loadChildren: () => import('./modules/enterprise_admin/enterprise-admin.module')
      .then(mod => mod.EnterpriseAdminModule)
  },
  {
    path: 'shift_or_department_admin',
    canActivate: [RoleGuard],
    data: {roles: ['DEPARTMENT_ADMIN', 'SHIFT_ADMIN']},
    loadChildren: () => import('./modules/shift_or_department_admin/shift-or-department.module')
      .then(mod => mod.ShiftOrDepartmentModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {enableTracing: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
