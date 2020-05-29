import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientModule } from './modules/client/client.module';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { LoginModule } from './modules/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestConfig } from './rest.config';
import { httpInterceptorProviders } from "./http-interceptors/interceptor-providers";
import { SimpleNotificationsModule } from "angular2-notifications";
import { OPTIONS } from "./modules/shift_or_department_admin/notification-options";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    ClientModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(OPTIONS)
  ],
  providers: [
    RestConfig,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
