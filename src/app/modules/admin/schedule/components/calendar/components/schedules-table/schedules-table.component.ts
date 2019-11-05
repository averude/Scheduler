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
import { ShiftSchedule } from "../../../../../../../model/shift-schedule";
import { filter, mergeMap } from "rxjs/operators";
import { ShiftScheduleService } from "../../../../../../../services/shift-schedule.service";
import { CalendarDay } from "../../../../../../../model/ui/calendar-day";
import { WorkDay } from "../../../../../../../model/workday";
import { RowData } from "../../../../../../../model/ui/row-data";
import { CellData } from "../../../../../../../model/ui/cell-data";
import { isBetween } from "../../utils/schedule-table-utils";
import { RowGroupData } from "../../../../../../../model/ui/row-group-data";

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

  shifts:             Shift[]         = [];
  shiftSchedule:      ShiftSchedule[] = [];
  employees:          Employee[]      = [];
  schedule:           ScheduleDto[]   = [];
  positions:          Position[]      = [];
  patterns:           ShiftPattern[]  = [];
  dayTypes:           DayType[]       = [];
  dayTypeGroups:      DayTypeGroup[]  = [];
  shiftsWorkingTime:  WorkingTime[]   = [];

  daysInMonth: CalendarDay[] = [];

  rowGroups: RowGroupData[];

  paginatorSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private paginatorService: PaginatorService,
              private shiftService: ShiftService,
              private shiftScheduleService: ShiftScheduleService,
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
        mergeMap(daysInMonth => {
          this.daysInMonth = daysInMonth;
          return forkJoin(
            this.workingTimeService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.scheduleService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.shiftScheduleService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString
            )
          )
        }),
      ).subscribe((values) => {
        this.shiftsWorkingTime  = values[0];
        this.schedule           = values[1];
        this.shiftSchedule      = values[2];
        this.rowGroups = this.getRowGroupData(this.shifts);
        this.cd.markForCheck();
      });
  }

  clearSelection() {
    this.shiftGroups
      .forEach(group => group.rows
        .forEach(row => row.clearSelection()));
  }

  private secretFoo() {
    this.paginatorService.dates.subscribe(daysInMonth => {
      this.daysInMonth = daysInMonth;
      forkJoin(
        this.employeeService.getAll(),
        this.positionService.getAll(),
        this.shiftService.getAll(),
        this.workingTimeService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString),
        this.scheduleService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString),
        this.shiftScheduleService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString
        )
      ).subscribe(values => {

      })
    })
  }

  getRowGroupData(shifts: Shift[]): RowGroupData[] {
    return shifts.map(shift => {
      let rowGroup = new RowGroupData();
      let shiftWorkingTime = this.getShiftWorkingTime(shift.id) ? this.getShiftWorkingTime(shift.id).hours : 0;
      rowGroup.shift = shift;
      rowGroup.workingTimeNorm = shiftWorkingTime;
      rowGroup.rows = this.getRowData(shift.id, shiftWorkingTime);
      return rowGroup;
    })
  }

  getRowData(shiftId: number,
             workingTimeNorm: number): RowData[] {
    let rowData = this.getNewShiftEmployees(shiftId).map(employee => {
      let row = new RowData();
      row.employee = employee;
      row.position = this.getPosition(employee);
      row.cells = this.getCells(employee.id, shiftId, this.daysInMonth);
      row.workingTimeNorm = workingTimeNorm;
      return row;
    });
    return rowData;
  }

  getPosition(employee: Employee): Position {
    return this.positions.find(position => position.id === employee.positionId);
  }

  getCells(employeeId: number, shiftId: number, daysInMonth: CalendarDay[]): CellData[] {
    return this.getCellData(daysInMonth, this.getSomeShitInTheHouse(employeeId, shiftId));
  }

  getCellData(calendarDays: CalendarDay[], schedule: WorkDay[]): CellData[] {
    if (!schedule || !calendarDays || schedule.length > calendarDays.length) {
      return;
    }

    let cellData: CellData[] = [];
    for (let dayIndex = 0, schedIndex = 0; dayIndex < calendarDays.length; dayIndex++) {

      let workDay     = schedule[schedIndex];
      let calendarDay = calendarDays[dayIndex];

      if (workDay && calendarDay.isoString === workDay.date) {
        schedIndex++;
        cellData.push({
          day: calendarDay,
          workDay: workDay,
          dayTypeGroups: this.dayTypeGroups,
          dayTypes: this.dayTypes
        });
      } else {
        cellData.push({
          day: calendarDay,
          workDay: null,
          dayTypeGroups: this.dayTypeGroups,
          dayTypes: this.dayTypes
        });
      }
    }

    return cellData;
  }

  // The algorithm needs to be reviewed
  getSomeShitInTheHouse(employeeId: number, shiftId: number): WorkDay[] {
    let ss = this.shiftSchedule.find(value => !value.substitution && value.shiftId === shiftId);
    if (ss && !ss.substitution) {
      return this.filterSchedule(employeeId, shiftId);
    } else {
      return this.filter(employeeId, shiftId);
    }
  }

  private filter(employeeId: number, shiftId: number): WorkDay[] {
    let shiftSchedules = this.shiftSchedule
      .filter(value => value.employeeId === employeeId && value.substitution && value.shiftId === shiftId);
    let dto = this.schedule
      .find(schedule => schedule.employeeId === employeeId);
    if (dto) {
      return dto.workDays
        .filter(workDay => {
          for (let i = 0; i < shiftSchedules.length; i++) {
            let ss = shiftSchedules[i];
            if (isBetween(workDay.date, ss.from, ss.to)) {
              return true;
            }
          }
        });
    }
  }

  private filterSchedule(employeeId: number, shiftId: number): WorkDay[] {
    let shiftSchedules = this.shiftSchedule
      .filter(value => value.employeeId === employeeId && value.shiftId !== shiftId);
    let sdto = this.schedule.find(schedule => schedule.employeeId === employeeId);
    if (sdto) {
      return this.recursivelyDo(sdto.workDays, shiftSchedules, shiftSchedules.length);
    }
  }

  private recursivelyDo(array: WorkDay[], limits: ShiftSchedule[], i: number): any  {
    if (i == 0) {
      return array;
    } else {
      i--;
      let limit = limits[i];
      return this.recursivelyDo(array.filter(value => !isBetween(value.date, limit.from, limit.to)), limits, i);
    }
  }
}
