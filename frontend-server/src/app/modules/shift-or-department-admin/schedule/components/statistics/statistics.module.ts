import { NgModule } from "@angular/core";
import { StatisticsTableComponent } from './components/statistics-table/statistics-table.component';
import { CommonModule } from "@angular/common";
import { PaginationService } from "../../../../../lib/ngx-schedule-table/service/pagination.service";
import { SimplePaginationStrategy } from "../../../../../shared/paginators/pagination-strategy/simple-pagination-strategy";
import { MonthYearPaginatorModule } from "../../../../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { StatisticsTableConfigMenuComponent } from './components/statistics-table-config-menu/statistics-table-config-menu.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MonthYearPaginatorModule,
  ],
  declarations: [
    StatisticsTableComponent,
    StatisticsTableConfigMenuComponent
  ],
  providers: [
    SimplePaginationStrategy,
    PaginationService
  ]
})
export class StatisticsModule {}
