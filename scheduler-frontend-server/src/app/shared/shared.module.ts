import { NgModule } from '@angular/core';
import { EditableRowDirective } from './directives/editable-row.directive';
import { MonthNameImpurePipe } from './pipes/month-name-impure.pipe';
import { PatternUnitsStringPipe } from "./pipes/pattern-units-string.pipe";
import { YearPaginatorComponent } from "./paginators/year-paginator/year-paginator.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { SimplePaginatorComponent } from './paginators/simple-paginator/simple-paginator.component';
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatMomentDateModule
  ],
  declarations: [
    EditableRowDirective,
    MonthNameImpurePipe,
    PatternUnitsStringPipe,
    YearPaginatorComponent,
    // MonthYearPaginatorComponent,
    SimplePaginatorComponent,
  ],
  exports: [
    EditableRowDirective,
    MonthNameImpurePipe,
    PatternUnitsStringPipe,
    YearPaginatorComponent,
    // MonthYearPaginatorComponent,
    SimplePaginatorComponent,
    MatDatepickerModule
  ],
  providers: [
    MatMomentDateModule
  ]
})
export class SharedModule {}
