import { NgModule } from '@angular/core';
import { EditableRowDirective } from './directives/editable-row.directive';
import { MonthNameImpurePipe } from './pipes/month-name-impure.pipe';
import { PatternUnitsStringPipe } from "./pipes/pattern-units-string.pipe";
import { YearPaginatorComponent } from "./paginators/year-paginator/year-paginator.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
  imports: [
    MatDatepickerModule,
    MatMomentDateModule
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
    MatDatepickerModule
  ],
  providers: [
    MatMomentDateModule
  ]
})
export class SharedModule {}
