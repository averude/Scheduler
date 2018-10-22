import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [LoginRoutingModule],
  declarations: [LoginComponent],
  exports: []
})
export class LoginModule {}
