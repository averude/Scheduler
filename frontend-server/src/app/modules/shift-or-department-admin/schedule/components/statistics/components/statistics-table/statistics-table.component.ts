import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatisticsService } from "../../../../../../../services/http/statistics.service";
import { SummationDto, SummationMode } from "../../../../../../../model/dto/summation-dto";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { forkJoin, Subscription } from "rxjs";
import { SummationColumnDtoService } from "../../../../../../../services/http/summation-column-dto.service";
import { SummationColumn } from "../../../../../../../model/summation-column";
import { SimplePaginationStrategy } from "../../../../../../../shared/paginators/pagination-strategy/simple-pagination-strategy";
import { Shift } from "../../../../../../../model/shift";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { Employee } from "../../../../../../../model/employee";
import { Position } from "../../../../../../../model/position";
import { getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { StatisticsColumnCompositor } from "../../../../../../../shared/compositor/statistics-column-compositor";
import { WorkingNormService } from "../../../../../../../services/http/working-norm.service";
import { PositionService } from "../../../../../../../services/http/position.service";
import {
  StatisticsRowGroup,
  StatisticsTableDataCollector
} from "../../../../../../../services/collectors/statistics/statistics-table-data-collector";

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent implements OnInit, OnDestroy {

  viewProxyShown: boolean;

  summationColumns: SummationColumn[];
  summationDtos:    SummationDto[];
  shifts:           Shift[];
  positions:        Position[];

  currentMode: SummationMode = SummationMode.PER_POSITION;

  private collector: StatisticsTableDataCollector = new StatisticsTableDataCollector();

  tableData: StatisticsRowGroup[] = [];

  private paginationSub: Subscription;

  constructor(public paginationStrategy: SimplePaginationStrategy,
              private paginationService: PaginationService,
              private statisticsColumnCompositor: StatisticsColumnCompositor,
              private shiftService: ShiftService,
              private positionService: PositionService,
              private summationColumnDtoService: SummationColumnDtoService,
              private statisticsService: StatisticsService,
              private workingNormService: WorkingNormService) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    if (this.paginationSub) this.paginationSub.unsubscribe();

    forkJoin([
      this.shiftService.getAll(),
      this.positionService.getAll(),
      this.summationColumnDtoService.getAll(), // refactor
    ]).subscribe(([shifts, positions, summationColumns]) => {
      this.shifts           = shifts;
      this.positions        = positions;
      this.summationColumns = summationColumns.map(value => value.parent);
      this.statisticsColumnCompositor.composeColumns(this.summationColumns);

      this.paginationSub = this.paginationService.onValueChange
        .subscribe(monthPaginationObject => {
            return forkJoin([
              this.statisticsService
                .getSummationDTO(monthPaginationObject.firstDayOfMonth, monthPaginationObject.lastDayOfMonth, this.currentMode),
              this.workingNormService
                .getAll(monthPaginationObject.firstDayOfMonth, monthPaginationObject.lastDayOfMonth)
            ]).subscribe(([summationDTOs, workingNorms]) => {
              this.viewProxyShown = false;
              this.statisticsColumnCompositor.composeResults(summationDTOs, this.summationColumns, workingNorms);
              this.summationDtos = summationDTOs;

              this.tableData = this.collector.getTableData(summationDTOs, shifts, positions);
            });
          }
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

  onDateChange() {
    this.viewProxyShown = true;
  }

  changeMode() {
    if (this.currentMode == SummationMode.PER_POSITION) {
      this.currentMode = SummationMode.OVERALL;
    } else {
      this.currentMode = SummationMode.PER_POSITION;
    }

    this.viewProxyShown = true;
    this.refresh();
  }
}
