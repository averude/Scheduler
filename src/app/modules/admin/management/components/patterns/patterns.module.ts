import { NgModule } from '@angular/core';
import { PatternSequenceComponent } from './components/pattern-sequence/pattern-sequence.component';
import { PatternsListComponent } from './components/patterns-list/patterns-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PatternUnitComponent } from './components/pattern-unit/pattern-unit.component';
import { PatternsComponent } from './patterns/patterns.component';
import { PatternSwitchService } from './pattern-switch.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    PatternSequenceComponent,
    PatternsListComponent,
    PatternUnitComponent,
    PatternsComponent
  ],
  providers: [PatternSwitchService]
})
export class PatternsModule {}
