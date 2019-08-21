import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, LoginRoutingModule],
  declarations: [LoginComponent],
  exports: []
})
export class LoginModule {}
