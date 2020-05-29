import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticsService } from "../../../../../../../http-services/statistics.service";
import { SummationDto } from "../../../../../../../model/dto/summation-dto";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { Subscription } from "rxjs";
import { SummationColumnDtoService } from "../../../../../../../http-services/summation-column-dto.service";
import { SummationColumn } from "../../../../../../../model/summation-column";
import { SimplePaginationStrategy } from "../../../../../../../shared/paginators/pagination-strategy/simple-pagination-strategy";

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit, OnDestroy {

  summationColumns: SummationColumn[];
  summationDtos:    SummationDto[];

  private paginationSub: Subscription;

  constructor(private paginationStrategy: SimplePaginationStrategy,
              private paginationService: PaginationService,
              private summationColumnDtoService: SummationColumnDtoService,
              private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.summationColumnDtoService.getAll()
      .subscribe(columns => {
        this.summationColumns = columns.map(value => value.parent);
        this.paginationSub = this.paginationService.onValueChange
          .subscribe(monthPaginationObject =>
            this.statisticsService
              .getSummationDto(monthPaginationObject.firstDayOfMonth, monthPaginationObject.lastDayOfMonth)
              .subscribe(summationDtos => this.summationDtos = summationDtos));
      });

  }

  ngOnDestroy(): void {
    this.paginationService.clearStoredValue();
    if (this.paginationSub) this.paginationSub.unsubscribe();
  }
}
