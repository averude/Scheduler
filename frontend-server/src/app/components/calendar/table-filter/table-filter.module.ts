import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterComponent } from './table-filter.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TableFilterComponent],
  exports: [TableFilterComponent]
})
export class TableFilterModule { }
