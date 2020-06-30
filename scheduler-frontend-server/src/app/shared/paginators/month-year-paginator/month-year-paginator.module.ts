import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MonthYearPaginatorComponent } from "./month-year-paginator.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatMomentDateModule
  ],
  declarations: [MonthYearPaginatorComponent],
  exports: [MonthYearPaginatorComponent]
})
export class MonthYearPaginatorModule {
}
