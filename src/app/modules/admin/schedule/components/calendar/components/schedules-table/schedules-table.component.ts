import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Employee } from '../../../../../../../model/employee';
import { EmployeeService } from '../../../../../../../services/employee.service';
import { ShiftPatternService } from '../../../../../../../services/shift-pattern.service';
import { ShiftPattern } from '../../../../../../../model/shift-pattern';
import { forkJoin, of, Subscription } from "rxjs";
import { WorkingTimeService } from "../../../../../../../services/working-time.service";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { Shift } from "../../../../../../../model/shift";
import { Position } from "../../../../../../../model/position";
import { WorkingTime } from "../../../../../../../model/working-time";
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
import { getShiftScheduleByDates, ShiftSchedule } from "../../../../../../../model/shift-schedule";
import { filter, mergeMap } from "rxjs/operators";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulesTableComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(ScheduleTableContextMenuComponent)
  contextMenuComponent: ScheduleTableContextMenuComponent;

  @ViewChildren(TableShiftGroupComponent)
  shiftGroups: QueryList<TableShiftGroupComponent>;

  shifts:             Shift[]         = [];
  shiftSchedule:      ShiftSchedule[] = [];
  employees:          Employee[]      = [];
  schedule:           ScheduleDto[]   = [];
  positions:          Position[]      = [];
  patterns:           ShiftPattern[]  = [];
  dayTypes:           DayType[]       = [];
  dayTypeGroups:      DayTypeGroup[]  = [];
  shiftsWorkingTime:  WorkingTime[]   = [];

  paginatorSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private paginatorService: PaginatorService,
              private shiftService: ShiftService,
              private employeeService: EmployeeService,
              private scheduleService: ScheduleService,
              private positionService: PositionService,
              private patternService: ShiftPatternService,
              private patternUnitService: PatternUnitService,
              private dayTypesService: DayTypeService,
              private dayTypeGroupService: DayTypeGroupService,
              private workingTimeService: WorkingTimeService) {
  }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
    this.paginatorService.clearStoredValue();
  }

  getNewShiftEmployees(shiftId: number): Employee[] {
    let employeeIds = this.shiftSchedule
      .filter(value => value.shiftId === shiftId)
      .map(value => value.employeeId);
    return this.employees
      .filter(value => employeeIds.findIndex(id => value.id === id) >= 0);
  }

  getShiftWorkingTime(shiftId: number): WorkingTime {
    return this.shiftsWorkingTime.find(workingTime => workingTime.shiftId === shiftId);
  }

  private getData() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees);

    this.positionService.getAll()
      .subscribe(positions => this.positions = positions);

    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);

    this.patternService.getAll()
      .subscribe(patterns => this.patterns = patterns);

    this.dayTypesService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes);

    this.dayTypeGroupService.getAll()
      .subscribe(dayTypeGroups => this.dayTypeGroups = dayTypeGroups);

    this.paginatorSub = this.paginatorService.dates
      .pipe(
        filter(values => values.length > 0),
        mergeMap(daysInMonth =>
          forkJoin(
            this.workingTimeService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.scheduleService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            of(this.shiftSchedule = getShiftScheduleByDates(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString
            ))
          )
        ),
      ).subscribe((values) => {
        this.shiftsWorkingTime  = values[0];
        this.schedule           = values[1];
        this.shiftSchedule      = values[2];
        this.cd.markForCheck();
      });
  }

  clearSelection() {
    this.shiftGroups
      .forEach(group => group.rows
        .forEach(row => row.clearSelection()));
  }
}
