import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { EmployeeService } from "../../http/employee.service";
import { ShiftService } from "../../http/shift.service";
import { ScheduleService } from "../../http/schedule.service";
import { WorkingNormService } from "../../http/working-norm.service";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { map, mergeMap } from "rxjs/operators";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";
import { Shift } from "../../../model/shift";
import { Position } from "../../../model/position";
import { RowGroupData } from "../../../lib/ngx-schedule-table/model/data/row-group-data";
import { MatDialog } from "@angular/material/dialog";
import { Employee } from "../../../model/employee";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { Row } from "../../../model/ui/schedule-table/table-data";
import { AuthService } from "../../http/auth.service";
import { WorkingNorm } from "../../../model/working-norm";
import { TableDataCollector } from "./table-data-collector.service";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { PositionService } from "../../http/position.service";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { UserAccountAuthority, UserAccountDTO } from "../../../model/dto/new-user-account-dto";

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

  get tableData(): Observable<RowGroupData[]> {
    if (this.authService.currentUserValue.roles.includes('DEPARTMENT_ADMIN')) {
      this.employeeService.getAll().subscribe(employees => this.employees = employees);
    }

    const userAccount = this.authService.currentUserAccount;

    this.shiftService.getAll().subscribe(shifts => this.shifts = shifts);
    this.positionService.getAll().subscribe(positions => this.positions = positions);

    return this.paginationService.onValueChange
      .pipe(
        mergeMap(daysInMonth => {
          this.calendarDays = daysInMonth;
          const sources = this.getSourcesByUserAccount(daysInMonth, userAccount);
          return forkJoin(sources).pipe(map(this.handleData()))
        }),
      );
  }

  private handleData() {
    return values => {
      this.scheduleDto = values[0];
      this.workingNorms = values[1].sort((a, b) => a.shiftId - b.shiftId);

      const data = this.tableDataCollector.collect(this.shifts, this.calendarDays, this.scheduleDto, this.positions, this.workingNorms);

      data.groups.forEach(group =>
        group.rows.forEach((row: Row) => {

          if (row.isSubstitution) {
            row.intervals = row.compositions.map(composition => convertCompositionToInterval(composition));
          } else {
            const dto = binarySearch(this.scheduleDto, (mid => mid.parent.id - row.id));
            row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionShiftCompositions);
          }

          this.cellEnabledSetter.processRow(row, data.from, data.to);

        }));

      const rowGroupData = data.groups;

      this.sumCalculator.calculateWorkHoursSum(rowGroupData);
      return rowGroupData;
    }
  }

  getSourcesByUserAccount(daysInMonth: CalendarDay[],
                          userAccount: UserAccountDTO) {
    let sources;

    switch (userAccount.authority) {
      case UserAccountAuthority.DEPARTMENT_ADMIN : {
        sources = this.getDepartmentUserSources(daysInMonth, userAccount);
        break;
      }

      case UserAccountAuthority.SHIFT_ADMIN : {
        sources = this.getShiftUserSources(daysInMonth, userAccount);
        break;
      }

      default : {
        throw new Error('User doesn\'t have required authority');
      }
    }
  }

  getDepartmentUserSources(daysInMonth: CalendarDay[],
                           userAccount: UserAccountDTO) {
    return [

      this.scheduleService.getAllByDepartmentId(
        userAccount.departmentId,
        daysInMonth[0].isoString,
        daysInMonth[daysInMonth.length - 1].isoString),

      this.workingNormService.getAll(
        daysInMonth[0].isoString,
        daysInMonth[daysInMonth.length - 1].isoString)

    ];
  }

  getShiftUserSources(daysInMonth: CalendarDay[],
                      userAccount: UserAccountDTO) {
    return [

      this.scheduleService.getAllByShiftIds(
        userAccount.shiftIds,
        daysInMonth[0].isoString,
        daysInMonth[daysInMonth.length - 1].isoString),

      this.workingNormService.getAll(
        daysInMonth[0].isoString,
        daysInMonth[daysInMonth.length - 1].isoString)

    ];
  }
}
