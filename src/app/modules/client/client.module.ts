import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ],
  declarations: [],
  providers: []
})
export class ClientModule {}
