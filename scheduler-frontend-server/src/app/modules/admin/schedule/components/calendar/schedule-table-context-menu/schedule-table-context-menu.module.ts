import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContextMenuModule } from "../../../../../../lib/ngx-contextmenu/ngx-contextmenu";
import { ScheduleTableContextMenuComponent } from "./components/context-menu/schedule-table-context-menu.component";
import { ContextMenuDaytypeItemComponent } from "./components/context-menu-daytype-item/context-menu-daytype-item.component";
import { CustomDaytypeDialogComponent } from './components/custom-daytype-dialog/custom-daytype-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ContextMenuModule.forRoot({
      autoFocus: true,
      useBootstrap4: false
    })
  ],
  declarations: [
    ScheduleTableContextMenuComponent,
    ContextMenuDaytypeItemComponent,
    CustomDaytypeDialogComponent
  ],
  exports: [
    ScheduleTableContextMenuComponent
  ],
  providers: [],
  entryComponents: [
    CustomDaytypeDialogComponent
  ]
})
export class ScheduleTableContextMenuModule { }
