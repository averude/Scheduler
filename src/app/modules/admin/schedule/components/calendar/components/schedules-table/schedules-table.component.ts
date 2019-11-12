import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Employee } from '../../../../../../../model/employee';
import { EmployeeService } from '../../../../../../../services/employee.service';
import { ShiftPatternService } from '../../../../../../../services/shift-pattern.service';
import { ShiftPattern } from '../../../../../../../model/shift-pattern';
import { forkJoin, Subscription } from "rxjs";
import { WorkingTimeService } from "../../../../../../../services/working-time.service";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { Shift } from "../../../../../../../model/shift";
import { Position } from "../../../../../../../model/position";
import { ShiftService } from "../../../../../../../services/shift.service";
import { DayType } from "../../../../../../../model/day-type";
import { DayTypeService } from "../../../../../../../services/day-type.service";
import { PositionService } from "../../../../../../../services/position.service";
import { DayTypeGroupService } from "../../../../../../../services/day-type-group.service";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { ScheduleService } from "../../../../../../../services/schedule.service";
import { ScheduleDto } from "../../../../../../../model/dto/schedule-dto";
import { PatternUnitService } from "../../../../../../../services/pattern-unit.service";
import { TableShiftGroupComponent } from "../table-shift-group/table-shift-group.component";
import { ScheduleTableContextMenuComponent } from "../schedule-table-context-menu/schedule-table-context-menu.component";
import { ShiftComposition } from "../../../../../../../model/shift-composition";
import { ShiftCompositionService } from "../../../../../../../services/shift-composition.service";
import { CalendarDay } from "../../../../../../../model/ui/calendar-day";
import { RowGroupData } from "../../../../../../../model/ui/row-group-data";
import { DataTransformer } from "../../../../../../../shared/transformers/data-transformer";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulesTableComponent implements OnInit, OnDestroy {

  @ViewChild(ScheduleTableContextMenuComponent)
  contextMenuComponent: ScheduleTableContextMenuComponent;

  @ViewChildren(TableShiftGroupComponent)
  shiftGroups: QueryList<TableShiftGroupComponent>;

  shifts:             Shift[]             = [];
  shiftSchedule:      ShiftComposition[]  = [];
  employees:          Employee[]          = [];
  schedule:           ScheduleDto[]       = [];
  positions:          Position[]          = [];
  patterns:           ShiftPattern[]      = [];
  dayTypes:           DayType[]           = [];
  dayTypeGroups:      DayTypeGroup[]      = [];

  daysInMonth: CalendarDay[] = [];

  rowGroups: RowGroupData[];

  paginatorSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private paginatorService: PaginatorService,
              private dataTransformer: DataTransformer,
              private shiftService: ShiftService,
              private shiftScheduleService: ShiftCompositionService,
              private employeeService: EmployeeService,
              private scheduleService: ScheduleService,
              private positionService: PositionService,
              private patternService: ShiftPatternService,
              private patternUnitService: PatternUnitService,
              private dayTypeService: DayTypeService,
              private dayTypeGroupService: DayTypeGroupService,
              private workingTimeService: WorkingTimeService) {
  }

  ngOnInit() {
    this.secretFoo();
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
    this.paginatorService.clearStoredValue();
  }

  clearSelection() {
    this.shiftGroups
      .forEach(group => group.rows
        .forEach(row => row.clearSelection()));
  }

  private secretFoo() {
    this.paginatorSub = this.paginatorService.dates.subscribe(daysInMonth => {
      this.daysInMonth = daysInMonth;
      forkJoin(
        this.shiftService.getAll(),
        this.shiftScheduleService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString
        ),
        this.employeeService.getAll(),
        this.scheduleService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString),
        this.positionService.getAll(),
        this.patternService.getAll(),
        this.dayTypeService.getAll(),
        this.dayTypeGroupService.getAll(),

        this.workingTimeService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString),
      ).subscribe(values => {

        this.patterns       = values[5];
        this.dayTypes       = values[6];
        this.dayTypeGroups  = values[7];

        this.rowGroups = this.dataTransformer
          .getData( values[0], values[1], values[2], values[3], values[4],
                    values[5], values[6], values[7], values[8], daysInMonth);
        this.cd.markForCheck();
      })
    })
  }
}
