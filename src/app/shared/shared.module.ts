import { NgModule } from '@angular/core';
import { EditableRowDirective } from './directives/editable-row.directive';
import { ScheduleLabelPipe } from './pipes/schedule-label.pipe';
import { MonthNameImpurePipe } from './pipes/month-name-impure.pipe';
import { PatternUnitsStringPipe } from "./pipes/pattern-units-string.pipe";
import { YearPaginatorComponent } from "./paginators/year-paginator/year-paginator.component";

@NgModule({
  imports: [

  ],
  declarations: [
    EditableRowDirective,
    ScheduleLabelPipe,
    MonthNameImpurePipe,
    PatternUnitsStringPipe,
    YearPaginatorComponent,
  ],
  exports: [
    EditableRowDirective,
    ScheduleLabelPipe,
    MonthNameImpurePipe,
    PatternUnitsStringPipe,
    YearPaginatorComponent
  ],
  providers: []
})
export class SharedModule {}
