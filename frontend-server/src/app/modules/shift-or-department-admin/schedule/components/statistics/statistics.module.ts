import { NgModule } from "@angular/core";
import { StatisticsTableComponent } from './components/statistics-table/statistics-table.component';
import { CommonModule } from "@angular/common";
import { PaginationService } from "../../../../../lib/ngx-schedule-table/service/pagination.service";
import { SimplePaginationStrategy } from "../../../../../shared/paginators/pagination-strategy/simple-pagination-strategy";
import { MonthYearPaginatorModule } from "../../../../../shared/paginators/month-year-paginator/month-year-paginator.module";

@NgModule({
  imports: [
    CommonModule,
    MonthYearPaginatorModule,
  ],
  declarations: [
    StatisticsTableComponent
  ],
  providers: [
    SimplePaginationStrategy,
    PaginationService
  ]
})
export class StatisticsModule {}
