import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContextMenuModule } from "../../../../../../lib/ngx-contextmenu/ngx-contextmenu";
import { ScheduleTableContextMenuComponent } from "./components/context-menu/schedule-table-context-menu.component";
import { ContextMenuDaytypeItemComponent } from "./components/context-menu-daytype-item/context-menu-daytype-item.component";
import { CustomDaytypeDialogComponent } from './components/custom-daytype-dialog/custom-daytype-dialog.component';
import { NgxMaskModule } from "ngx-mask";

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
    }),
    NgxMaskModule.forChild()
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
