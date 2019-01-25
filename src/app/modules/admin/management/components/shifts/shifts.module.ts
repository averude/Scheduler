import { NgModule } from '@angular/core';
import { AddShiftComponent } from './components/add-shift/add-shift.component';
import { ShiftsTableComponent } from './components/shifts-table/shifts-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AddShiftComponent,
    ShiftsTableComponent
  ]
})
export class ShiftsModule {}
