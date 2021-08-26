import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleTableFilterComponent } from './schedule-table-filter.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ScheduleTableFilterComponent],
  exports: [ScheduleTableFilterComponent]
})
export class ScheduleTableFilterModule { }
