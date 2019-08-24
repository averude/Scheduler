import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { LoginComponent } from './modules/login/login.component';
import { ScheduleTableComponent } from './modules/client/components/schedule-table/schedule-table.component';
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
    loadChildren: () => import('./modules/global-admin/global-admin.module')
      .then(mod => mod.GlobalAdminModule)
  },
  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: {roles: ['DEPARTMENT_ADMIN', 'SHIFT_ADMIN']},
    loadChildren: () => import('./modules/admin/admin.module')
      .then(mod => mod.AdminModule)
  },
  {
    path: 'client',
    canActivate: [RoleGuard],
    data: {roles: ['CLIENT']},
    component: ScheduleTableComponent
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
