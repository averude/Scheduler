import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { WorkingNormTableConfigurationMenuComponent } from "./working-norm-table-configuration-menu.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule
  ],
  declarations: [
    WorkingNormTableConfigurationMenuComponent
  ],
  exports: [
    WorkingNormTableConfigurationMenuComponent
  ],
  providers: []
})
export class WorkingNormTableConfigurationMenuModule {}
