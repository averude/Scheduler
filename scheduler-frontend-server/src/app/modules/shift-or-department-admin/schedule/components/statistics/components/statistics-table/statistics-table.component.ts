import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticsService } from "../../../../../../../services/http/statistics.service";
import { SummationDto, SummationResult } from "../../../../../../../model/dto/summation-dto";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { forkJoin, Subscription } from "rxjs";
import { SummationColumnDtoService } from "../../../../../../../services/http/summation-column-dto.service";
import { HOURS_SUM, SummationColumn } from "../../../../../../../model/summation-column";
import { SimplePaginationStrategy } from "../../../../../../../shared/paginators/pagination-strategy/simple-pagination-strategy";
import { Shift } from "../../../../../../../model/shift";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { Employee } from "../../../../../../../model/employee";
import { getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { ShiftCompositionService } from "../../../../../../../services/http/shift-composition.service";
import { sortByCompositions } from "../../../../../../../shared/utils/collection-utils";

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

  constructor(public paginationStrategy: SimplePaginationStrategy,
              private paginationService: PaginationService,
              private shiftService: ShiftService,
              private summationColumnDtoService: SummationColumnDtoService,
              private statisticsService: StatisticsService,
              private shiftCompositionService: ShiftCompositionService) { }

  ngOnInit() {
    forkJoin([
      this.shiftService.getAll(),
      this.summationColumnDtoService.getAll(),
    ]).subscribe(values => {
      this.shifts           = values[0];
      this.summationColumns = values[1].map(value => value.parent);

      this.paginationSub = this.paginationService.onValueChange
        .subscribe(monthPaginationObject =>
          forkJoin([
            this.statisticsService
              .getSummationDto(monthPaginationObject.firstDayOfMonth, monthPaginationObject.lastDayOfMonth),
            this.shiftCompositionService
              .getAll(monthPaginationObject.firstDayOfMonth, monthPaginationObject.lastDayOfMonth)
          ]).subscribe(values => {
            sortByCompositions(values[0], values[1]);
            this.summationDtos = values[0].slice(0, values[1].length);
          })
        );
    });
  }

  ngOnDestroy(): void {
    this.paginationService.clearStoredValue();
    if (this.paginationSub) this.paginationSub.unsubscribe();
  }

  convertStat(summationResult: SummationResult): number {
    return summationResult.type === HOURS_SUM ? summationResult.value / 60 : summationResult.value;
  }

  getEmployeeShortName(employee: Employee): string {
    return getEmployeeShortName(employee);
  }
}
