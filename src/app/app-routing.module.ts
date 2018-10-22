import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './modules/client/client.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'client/:clientId',
    component: ClientComponent
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
