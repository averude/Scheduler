import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { ScheduleTableContextMenuComponent } from "./schedule-table-context-menu.component";
import { ContextMenuDaytypeItemComponent } from "./context-menu-daytype-item/context-menu-daytype-item.component";
import { FormsModule } from "@angular/forms";
import { ContextMenuModule } from "../../../../../../lib/ngx-contextmenu/ngx-contextmenu";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ContextMenuModule.forRoot({
      autoFocus: true,
      useBootstrap4: false
    })
  ],
  declarations: [
    ScheduleTableContextMenuComponent,
    ContextMenuDaytypeItemComponent
  ],
  exports: [
    ScheduleTableContextMenuComponent
  ]
})
export class ScheduleTableContextMenuModule { }
