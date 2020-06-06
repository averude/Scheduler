import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticsService } from "../../../../../../../http-services/statistics.service";
import { SummationDto } from "../../../../../../../model/dto/summation-dto";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { forkJoin, Subscription } from "rxjs";
import { SummationColumnDtoService } from "../../../../../../../http-services/summation-column-dto.service";
import { SummationColumn } from "../../../../../../../model/summation-column";
import { SimplePaginationStrategy } from "../../../../../../../shared/paginators/pagination-strategy/simple-pagination-strategy";
import { Shift } from "../../../../../../../model/shift";
import { ShiftService } from "../../../../../../../http-services/shift.service";

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit, OnDestroy {

  summationColumns: SummationColumn[];
  summationDtos:    SummationDto[];
  shifts:           Shift[];

  private paginationSub: Subscription;

  constructor(private paginationStrategy: SimplePaginationStrategy,
              private paginationService: PaginationService,
              private shiftService: ShiftService,
              private summationColumnDtoService: SummationColumnDtoService,
              private statisticsService: StatisticsService) { }

  ngOnInit() {
    forkJoin([
      this.shiftService.getAll(),
      this.summationColumnDtoService.getAll()
    ]).subscribe(values => {
      this.shifts           = values[0];
      this.summationColumns = values[1].map(value => value.parent);

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
