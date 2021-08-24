import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { LoginComponent } from './modules/login/login.component';
import { LevelRoleGuard } from "./guards/level-role.guard";
import { UserAccountLevel, UserAccountRole } from "./model/dto/user-account-dto";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'global_admin',
    canActivate: [LevelRoleGuard],
    data: {
      levels: [
        UserAccountLevel.GLOBAL
      ],
      roles: [
        UserAccountRole.ADMIN
      ]
    },
    loadChildren: () => import('./modules/global-admin/global-admin.module')
      .then(mod => mod.GlobalAdminModule)
  },
  {
    path: 'admin',
    canActivate: [LevelRoleGuard],
    data: {
      levels: [
        UserAccountLevel.ENTERPRISE,
        UserAccountLevel.DEPARTMENT,
        UserAccountLevel.SHIFT
      ],
      roles: [
        UserAccountRole.ADMIN,
        UserAccountRole.USER
      ]
    },
    loadChildren: () => import('./modules/admin/admin.module')
      .then(mod => mod.AdminModule)
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
