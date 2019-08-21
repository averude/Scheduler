import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { PositionsTableComponent } from './components/positions-table/positions-table.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AddPositionComponent,
    PositionsTableComponent
  ]
})
export class PositionsModule {}
