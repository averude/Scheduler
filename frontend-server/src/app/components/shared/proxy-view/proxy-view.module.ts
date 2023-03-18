import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxyViewComponent } from './proxy-view.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [ProxyViewComponent],
  exports: [ProxyViewComponent]
})
export class ProxyViewModule { }
