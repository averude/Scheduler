import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { AddDaytypeComponent } from './components/add-daytype/add-daytype.component';
import { DayTypesTableComponent } from './components/daytypes-table/daytypes-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule],
  declarations: [
    AddDaytypeComponent,
    DayTypesTableComponent]
})
export class DayTypesModule {}
