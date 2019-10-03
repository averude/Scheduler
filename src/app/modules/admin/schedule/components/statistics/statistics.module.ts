import { NgModule } from "@angular/core";
import { StatisticsTableComponent } from './components/statistics-table/statistics-table.component';
import { CommonModule } from "@angular/common";
import { StatisticsShiftGroupComponent } from './components/statistics-shift-group/statistics-shift-group.component';
import { StatisticsTableRowComponent } from './components/statistics-table-row/statistics-table-row.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatisticsTableComponent,
    StatisticsShiftGroupComponent,
    StatisticsTableRowComponent
  ]
})
export class StatisticsModule {}
