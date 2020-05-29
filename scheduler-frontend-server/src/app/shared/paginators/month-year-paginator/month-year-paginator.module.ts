import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule, MatFormFieldModule, MatInputModule } from "@angular/material";
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
