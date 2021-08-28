import { NgModule } from "@angular/core";
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { CommonModule } from "@angular/common";
import { MonthYearPaginatorModule } from "../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { MatMenuModule } from "@angular/material/menu";
import { StatisticsTableSource } from "./statistics-table-source";
import { StatisticsTableDataCollector } from "./collector/statistics-table-data-collector";
import { ProxyViewModule } from "../proxy-view/proxy-view.module";

@NgModule({
  imports: [
    CommonModule,
    ProxyViewModule,
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
