import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { LoginModule } from './modules/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestConfig } from './rest.config';
import { httpInterceptorProviders } from "./http-interceptors/interceptor-providers";
import { GlobalAdminModule } from "./modules/global-admin/global-admin.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    ClientModule,
    AdminModule,
    GlobalAdminModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    RestConfig,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
