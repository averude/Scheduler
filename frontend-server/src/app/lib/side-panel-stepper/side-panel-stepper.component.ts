import { Component } from '@angular/core';
import { CdkStepper } from "@angular/cdk/stepper";
import { matStepperAnimations } from "@angular/material/stepper";

@Component({
  selector: 'side-panel-stepper',
  templateUrl: './side-panel-stepper.component.html',
  styleUrls: ['./side-panel-stepper.component.scss'],
  animations: [matStepperAnimations.horizontalStepTransition],
  providers: [{provide: CdkStepper, useExisting: SidePanelStepperComponent}]
})
export class SidePanelStepperComponent extends CdkStepper {

}
