import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarContainerComponent } from './calendar-container.component';
import { ContentDef, HeaderDef } from "./directives";
import { ProxyViewModule } from "../../components/shared/proxy-view/proxy-view.module";

@NgModule({
  imports: [
    CommonModule,
    ProxyViewModule
  ],
  declarations: [
    HeaderDef,
    ContentDef,
    CalendarContainerComponent
  ],
  exports: [
    HeaderDef,
    ContentDef,
    CalendarContainerComponent
  ]
})
export class CalendarContainerModule { }
