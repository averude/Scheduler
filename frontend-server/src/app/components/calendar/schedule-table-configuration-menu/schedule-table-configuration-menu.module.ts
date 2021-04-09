import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { ScheduleTableConfigurationMenuComponent } from "./schedule-table-configuration-menu.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule
  ],
  declarations: [
    ScheduleTableConfigurationMenuComponent
  ],
  exports: [
    ScheduleTableConfigurationMenuComponent
  ],
  providers: []
})
export class ScheduleTableConfigurationMenuModule {}
