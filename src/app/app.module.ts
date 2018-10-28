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
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [RestConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
