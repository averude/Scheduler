import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { PositionsTableComponent } from './components/positions-table/positions-table.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [BrowserModule, FormsModule, SharedModule],
  declarations: [
    AddPositionComponent,
    PositionsTableComponent
  ],
  exports: [
    AddPositionComponent,
    PositionsTableComponent
  ],
  providers: []
})
export class PositionsModule {}
