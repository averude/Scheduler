import { NgModule } from '@angular/core';
import { MonthNameImpurePipe } from './pipes/month-name-impure.pipe';
import { PatternUnitsStringPipe } from "./pipes/pattern-units-string.pipe";
import { YearPaginatorComponent } from "./paginators/year-paginator/year-paginator.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { SimplePaginatorComponent } from './paginators/simple-paginator/simple-paginator.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
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
    MonthNameImpurePipe,
    PatternUnitsStringPipe,
    YearPaginatorComponent,
    SimplePaginatorComponent,
  ],
  exports: [
    MonthNameImpurePipe,
    PatternUnitsStringPipe,
    YearPaginatorComponent,
    SimplePaginatorComponent,
    MatDatepickerModule
  ],
  providers: [
    MatMomentDateModule
  ]
})
export class SharedModule {}
