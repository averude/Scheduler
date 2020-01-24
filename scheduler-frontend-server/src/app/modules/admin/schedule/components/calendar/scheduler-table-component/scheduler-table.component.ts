import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { DatePaginationService } from "../../../../../../lib/ngx-schedule-table/service/date-pagination.service";
import { ShiftService } from "../../../../../../http-services/shift.service";
import { ShiftCompositionService } from "../../../../../../http-services/shift-composition.service";
import { EmployeeService } from "../../../../../../http-services/employee.service";
import { ScheduleService } from "../../../../../../http-services/schedule.service";
import { PositionService } from "../../../../../../http-services/position.service";
import { ShiftPatternService } from "../../../../../../http-services/shift-pattern.service";
import { PatternUnitService } from "../../../../../../http-services/pattern-unit.service";
import { DayTypeService } from "../../../../../../http-services/day-type.service";
import { DayTypeGroupService } from "../../../../../../http-services/day-type-group.service";
import { WorkingTimeService } from "../../../../../../http-services/working-time.service";
import { forkJoin, Subscription } from "rxjs";
import { ShiftPattern } from "../../../../../../model/shift-pattern";
import { DayType } from "../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../model/day-type-group";
import { RowGroupCollector } from "../../../../../../lib/ngx-schedule-table/collectors/row-group-collector";
import { SchedulerRowGroupCollector } from "../collectors/scheduler-row-group-collector";
import { RowCollector } from "../../../../../../lib/ngx-schedule-table/collectors/row-collector";
import { CellCollector } from "../../../../../../lib/ngx-schedule-table/collectors/cell-collector";
import { SchedulerRowCollector } from "../collectors/scheduler-row-collector";
import { SchedulerCellCollector } from "../collectors/scheduler-cell-collector";
import { SchedulerCellLabelSetter } from "../utils/scheduler-cell-label-setter";
import { RowRendererService } from "../../../../../../lib/ngx-schedule-table/service/row-renderer.service";
import { roundToTwo } from "../../../../../../shared/utils/utils";
import { calculateWorkHours } from "../../../../../../shared/utils/time-converter";

@Component({
  selector: 'app-scheduler-table-component',
  templateUrl: './scheduler-table.component.html',
  styleUrls: ['./scheduler-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerTableComponent implements OnInit, OnDestroy {

  patterns:           ShiftPattern[]      = [];
  dayTypes:           DayType[]           = [];
  dayTypeGroups:      DayTypeGroup[]      = [];

  rowGroupCollector:  RowGroupCollector<any>;
  rowCollector:       RowCollector<any, any>;
  cellCollector:      CellCollector<any, any>;
  cellLabelSetter:    SchedulerCellLabelSetter = new SchedulerCellLabelSetter();

  paginatorSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private datePaginationService: DatePaginationService,
              private rowRenderer: RowRendererService,
              private shiftService: ShiftService,
              private shiftCompositionService: ShiftCompositionService,
              private employeeService: EmployeeService,
              private scheduleService: ScheduleService,
              private positionService: PositionService,
              private patternService: ShiftPatternService,
              private patternUnitService: PatternUnitService,
              private dayTypeService: DayTypeService,
              private dayTypeGroupService: DayTypeGroupService,
              private workingTimeService: WorkingTimeService) { }

  ngOnInit() {
    this.secretFoo();
  }

  ngOnDestroy(): void {
    this.datePaginationService.clearStoredValue();
    this.paginatorSub.unsubscribe();
  }

  private secretFoo() {
    this.paginatorSub = this.datePaginationService.dates.subscribe(daysInMonth => {
      forkJoin(
        this.shiftService.getAllByAuth(),
        this.shiftCompositionService.getAllByAuthAndDateBetween(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString
        ),
        this.employeeService.getAllByAuthAndDateBetween(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString),
        this.scheduleService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString),
        this.positionService.getAllByAuth(),
        this.patternService.getAllByAuth(),
        this.dayTypeService.getAllByAuth(),
        this.dayTypeGroupService.getAllByAuth(),

        this.workingTimeService.getAllByAuthAndDateBetween(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString),
      ).subscribe((values: any[][]) => {

        this.patterns       = values[5];
        this.dayTypes       = values[6].sort(((a, b) => a.id - b.id));
        this.dayTypeGroups  = values[7];

        this.cellLabelSetter.dayTypes       = this.dayTypes;
        this.cellLabelSetter.dayTypeGroups  = this.dayTypeGroups;

        this.rowGroupCollector = new SchedulerRowGroupCollector(values[0], values[8]);
        this.rowCollector = new SchedulerRowCollector(values[3], values[2], values[4], values[8], values[1]);
        this.cellCollector = new SchedulerCellCollector(values[6].sort(((a, b) => a.id - b.id)), values[7]);

        this.cd.markForCheck();
        this.rowRenderer.renderAllRows();
      })
    })
  }

  // Rewrite
  calculateSum(rowData: any) {
    rowData.sum = rowData.workDays
      .map(workDay =>
        calculateWorkHours(workDay.startTime, workDay.endTime, workDay.breakStartTime, workDay.breakEndTime))
      .reduce((prev, curr) => prev + curr, 0);
    return rowData.sum;
  }

  calculateDiff(rowData: any) {
    return roundToTwo(rowData.timeNorm - rowData.sum);
  }
}
