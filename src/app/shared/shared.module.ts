import { NgModule } from '@angular/core';
import { EditableRowDirective } from './directives/editable-row.directive';
import { MonthNameImpurePipe } from './pipes/month-name-impure.pipe';
import { PatternUnitsStringPipe } from "./pipes/pattern-units-string.pipe";
import { YearPaginatorComponent } from "./paginators/year-paginator/year-paginator.component";

@NgModule({
  imports: [

  ],
  declarations: [
    EditableRowDirective,
    MonthNameImpurePipe,
    PatternUnitsStringPipe,
    YearPaginatorComponent,
  ],
  exports: [
    EditableRowDirective,
    MonthNameImpurePipe,
    PatternUnitsStringPipe,
    YearPaginatorComponent,
  ],
  providers: []
})
export class SharedModule {}
