import { NgModule } from "@angular/core";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CommonModule } from "@angular/common";
import { SidePanelStepperComponent } from "./side-panel-stepper.component";

@NgModule({
  imports: [
    CommonModule,
    CdkStepperModule
  ],
  declarations: [
    SidePanelStepperComponent
  ],
  exports: [
    SidePanelStepperComponent
  ],
  entryComponents: [
    SidePanelStepperComponent
  ]
})
export class SidePanelStepperModule {
}
