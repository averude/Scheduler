import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { EmployeeService } from "../../http/employee.service";
import { ShiftService } from "../../http/shift.service";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { map, mergeMap } from "rxjs/operators";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";
import { Shift } from "../../../model/shift";
import { Position } from "../../../model/position";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { MatDialog } from "@angular/material/dialog";
import { Employee } from "../../../model/employee";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { ScheduleRow } from "../../../model/ui/schedule-table/table-data";
import { AuthService } from "../../http/auth.service";
import { WorkingNorm } from "../../../model/working-norm";
import { TableDataCollector } from "./table-data-collector.service";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { PositionService } from "../../http/position.service";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { ScheduleService } from "../../http/schedule.service";
import { WorkingNormService } from "../../http/working-norm.service";

@Injectable()
export class TableDataSource {

  shifts:       Shift[];
  positions:    Position[];
  employees:    Employee[];
  scheduleDto:  EmployeeScheduleDTO[];
  workingNorms: WorkingNorm[];
  calendarDays: CalendarDay[];

  constructor(private dialog: MatDialog,
              private tableDataCollector: TableDataCollector,
              private intervalCreator: IntervalCreator,
              private cellEnabledSetter: CellEnabledSetter,
              private authService: AuthService,
              private sumCalculator: TableSumCalculator,
              private paginationService: PaginationService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService,
              private positionService: PositionService,
              private scheduleService: ScheduleService,
              private workingNormService: WorkingNormService) {
  }

  getTableDataByDepartmentId(departmentId: number): Observable<RowGroup[]> {
    this.employeeService.getAllByDepartmentId(departmentId)
      .subscribe(employees => this.employees = employees);
    this.shiftService.getAllByDepartmentId(departmentId)
      .subscribe(shifts => this.shifts = shifts);
    this.positionService.getAllByDepartmentId(departmentId)
      .subscribe(positions => this.positions = positions);

    return this.paginationService.onValueChange
      .pipe(
        mergeMap(daysInMonth => {
          this.calendarDays = daysInMonth;

          const from  = daysInMonth[0].isoString;
          const to    = daysInMonth[daysInMonth.length - 1].isoString;

          const sources = [
            this.scheduleService.getAllByDepartmentId(departmentId, from, to),
            this.workingNormService.getAllByDepartmentId(departmentId, from, to)
          ];

          return forkJoin(sources).pipe(map(this.handleData()));
        }),
      );
  }

  getTableDataByShiftIds(departmentId: number,
                         shiftIds: number[]): Observable<RowGroup[]> {
    this.shiftService.getAllByDepartmentId(departmentId)
      .subscribe(shifts => this.shifts = shifts);
    this.positionService.getAllByDepartmentId(departmentId)
      .subscribe(positions => this.positions = positions);

    return this.paginationService.onValueChange
      .pipe(
        mergeMap(daysInMonth => {
          this.calendarDays = daysInMonth;

          const from  = daysInMonth[0].isoString;
          const to    = daysInMonth[daysInMonth.length - 1].isoString;

          const sources = [
            this.scheduleService.getAllByShiftIds(shiftIds, from, to),
            this.workingNormService.getAllByDepartmentId(departmentId, from, to)
          ];

          return forkJoin(sources).pipe(map(this.handleData()));
        }),
      );
  }

  private handleData() {
    return ([schedule, workingNorms]) => {
      this.scheduleDto = schedule;
      this.workingNorms = workingNorms.sort((a, b) => a.shiftId - b.shiftId);

      const data = this.tableDataCollector.collect(this.shifts, this.calendarDays, this.scheduleDto, this.positions, this.workingNorms);

      data.groups.forEach(group =>
        group.rows.forEach((row: ScheduleRow) => {

          if (row.isSubstitution) {
            row.intervals = row.compositions.map(composition => convertCompositionToInterval(composition));
          } else {
            const dto = binarySearch(this.scheduleDto, (mid => mid.parent.id - row.id));
            row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionCompositions);
          }

          this.cellEnabledSetter.processRow(row, data.from, data.to);

        }));

      const rowGroupData = data.groups;

      this.sumCalculator.calculateWorkHoursSum(rowGroupData);
      return rowGroupData;
    }
  }
}
