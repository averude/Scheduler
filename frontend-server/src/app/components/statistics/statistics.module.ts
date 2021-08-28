import { NgModule } from "@angular/core";
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { CommonModule } from "@angular/common";
import { MonthYearPaginatorModule } from "../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { StatisticsTableSource } from "./statistics-table-source";
import { StatisticsTableDataCollector } from "./collector/statistics-table-data-collector";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MonthYearPaginatorModule
  ],
  declarations: [
    StatisticsTableComponent
  ],
  providers: [
    StatisticsTableSource,
    StatisticsTableDataCollector
  ]
})
export class StatisticsModule {}
