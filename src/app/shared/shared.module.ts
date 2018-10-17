import { NgModule } from '@angular/core';
import { EditableRowDirective } from './directives/editable-row.directive';
import { ScheduleLabelPipe } from './pipes/schedule-label.pipe';
import { MonthNameImpurePipe } from './pipes/month-name-impure.pipe';

@NgModule({
  imports: [],
  declarations: [EditableRowDirective, ScheduleLabelPipe, MonthNameImpurePipe],
  exports: [EditableRowDirective, ScheduleLabelPipe, MonthNameImpurePipe],
  providers: []
})
export class SharedModule {}
