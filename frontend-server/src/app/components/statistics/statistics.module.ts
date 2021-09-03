import { NgModule } from "@angular/core";
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { CommonModule } from "@angular/common";
import { MonthYearPaginatorModule } from "../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { MatMenuModule } from "@angular/material/menu";
import { StatisticsTableSource } from "./statistics-table-source";
import { StatisticsTableDataCollector } from "./collector/statistics-table-data-collector";
import { CalendarContainerModule } from "../../lib/calendar-container/calendar-container.module";
import { StatisticsRoutingModule } from "./statistics-routing.module";

@NgModule({
  imports: [
    CommonModule,
    CalendarContainerModule,
    MatMenuModule,
    MonthYearPaginatorModule,
    StatisticsRoutingModule
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
