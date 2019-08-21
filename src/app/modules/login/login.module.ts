import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatFormFieldModule, MatInputModule } from "@angular/material";
import { BgParallaxDirective } from "../../shared/directives/bg-parallax.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent, BgParallaxDirective],
  exports: []
})
export class LoginModule {}
