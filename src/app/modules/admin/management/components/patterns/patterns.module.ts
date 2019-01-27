import { NgModule } from '@angular/core';
import { PatternSequenceComponent } from './components/pattern-sequence/pattern-sequence.component';
import { PatternsListComponent } from './components/patterns-list/patterns-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PatternUnitComponent } from './components/pattern-unit/pattern-unit.component';
import { PatternsComponent } from './patterns/patterns.component';
import { PatternSwitchService } from './services/pattern-switch.service';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UnitControlService } from "./services/unit-control.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  declarations: [
    PatternSequenceComponent,
    PatternsListComponent,
    PatternUnitComponent,
    PatternsComponent
  ],
  providers: [
    PatternSwitchService,
    UnitControlService
  ]
})
export class PatternsModule {}
