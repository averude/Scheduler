import { NgModule } from "@angular/core";
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { CommonModule } from "@angular/common";
import { PaginationService } from "../../lib/ngx-schedule-table/service/pagination.service";
import { SimplePaginationStrategy } from "../../shared/paginators/pagination-strategy/simple-pagination-strategy";
import { MonthYearPaginatorModule } from "../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { StatisticsTableSource } from "./statistics-table-source";
import { StatisticsTableDataCollector } from "./collector/statistics-table-data-collector";
import { ScheduleTableModule } from "../../lib/ngx-schedule-table/schedule-table.module";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MonthYearPaginatorModule,
    ScheduleTableModule
  ],
  declarations: [
    StatisticsTableComponent
  ],
  providers: [
    StatisticsTableSource,
    StatisticsTableDataCollector,
    SimplePaginationStrategy,
    PaginationService
  ]
})
export class StatisticsModule {}
