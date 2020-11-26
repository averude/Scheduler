import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticsService } from "../../../../../../../services/http/statistics.service";
import { SummationDto } from "../../../../../../../model/dto/summation-dto";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { forkJoin, Subscription } from "rxjs";
import { SummationColumnDtoService } from "../../../../../../../services/http/summation-column-dto.service";
import { SummationColumn } from "../../../../../../../model/summation-column";
import { SimplePaginationStrategy } from "../../../../../../../shared/paginators/pagination-strategy/simple-pagination-strategy";
import { Shift } from "../../../../../../../model/shift";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { Employee } from "../../../../../../../model/employee";
import { getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { MainShiftCompositionService } from "../../../../../../../services/http/main-shift-composition.service";
import { StatisticsColumnCompositor } from "../../../../../../../shared/compositor/statistics-column-compositor";
import { WorkingNormService } from "../../../../../../../services/http/working-norm.service";
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
              private statisticsColumnCompositor: StatisticsColumnCompositor,
              private shiftService: ShiftService,
              private summationColumnDtoService: SummationColumnDtoService,
              private statisticsService: StatisticsService,
              private workingNormService: WorkingNormService,
              private shiftCompositionService: MainShiftCompositionService) { }

  ngOnInit() {
    forkJoin([
      this.shiftService.getAll(),
      this.summationColumnDtoService.getAll(),
    ]).subscribe(values => {
      this.shifts           = values[0];
      this.summationColumns = values[1].map(value => value.parent);
      this.statisticsColumnCompositor.composeColumns(this.summationColumns);

      this.paginationSub = this.paginationService.onValueChange
        .subscribe(monthPaginationObject =>
          forkJoin([
            this.statisticsService
              .getSummationDto(monthPaginationObject.firstDayOfMonth, monthPaginationObject.lastDayOfMonth),
            this.shiftCompositionService
              .getAll(monthPaginationObject.firstDayOfMonth, monthPaginationObject.lastDayOfMonth),
            this.workingNormService
              .getAll(monthPaginationObject.firstDayOfMonth, monthPaginationObject.lastDayOfMonth)
          ]).subscribe(values => {
            sortByCompositions(values[0], values[1]);
            this.statisticsColumnCompositor.composeResults(values[0], this.summationColumns, values[1], values[2]);
            this.summationDtos = values[0];
          })
        );
    });
  }

  ngOnDestroy(): void {
    this.paginationService.clearStoredValue();
    if (this.paginationSub) this.paginationSub.unsubscribe();
  }

  getEmployeeShortName(employee: Employee): string {
    return getEmployeeShortName(employee);
  }
}
