import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameInfoCellComponent } from './name-info-cell.component';


@NgModule({
  declarations: [NameInfoCellComponent],
  exports: [NameInfoCellComponent],
  imports: [
    CommonModule
  ]
})
export class NameInfoCellModule { }
