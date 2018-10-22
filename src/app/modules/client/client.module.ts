import { NgModule } from '@angular/core';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  imports: [ClientRoutingModule],
  declarations: [ClientComponent]
})
export class ClientModule {}
