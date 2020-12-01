import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { EmployeeService } from "../../../../../../services/http/employee.service";
import { ShiftService } from "../../../../../../services/http/shift.service";
import { MainShiftCompositionService } from "../../../../../../services/http/main-shift-composition.service";
import { SubstitutionShiftCompositionService } from "../../../../../../services/http/substitution-shift-composition.service";
import { ScheduleService } from "../../../../../../services/http/schedule.service";
import { WorkingNormService } from "../../../../../../services/http/working-norm.service";
import { PaginationService } from "../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { flatMap, map } from "rxjs/operators";
import { ScheduleTableDataCollector } from "./schedule-table-data-collector";
import { TableSumCalculator } from "../../../../../../services/calculators/table-sum-calculator.service";
import { Shift } from "../../../../../../model/shift";
import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";
import { MatDialog } from "@angular/material/dialog";
import { MainShiftCompositionDialogComponent } from "../table-edit-mode-control/components/main-shift-composition-dialog/main-shift-composition-dialog.component";
import { MainShiftComposition } from "../../../../../../model/main-shift-composition";
import { BasicDto } from "../../../../../../model/dto/basic-dto";
import { Employee } from "../../../../../../model/employee";
import { WorkDay } from "../../../../../../model/workday";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { NotificationsService } from "angular2-notifications";
import { TableRenderer } from "../../../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { RowDataCollector } from "../table-edit-mode-control/row-data-collector";

@Injectable()
export class TableDataCollector {

  private shifts: Shift[];
  private employees: Employee[];
  private scheduleDto: BasicDto<Employee, WorkDay>[];
  private calendarDays: CalendarDay[];

  constructor(private dialog: MatDialog,
              private tableRenderer: TableRenderer,
              private rowDataCollector: RowDataCollector,
              private tableDataCollector: ScheduleTableDataCollector,
              private sumCalculator: TableSumCalculator,
              private paginationService: PaginationService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService,
              private mainShiftCompositionService: MainShiftCompositionService,
              private substitutionShiftCompositionService: SubstitutionShiftCompositionService,
              private scheduleService: ScheduleService,
              private workingNormService: WorkingNormService,
              private notificationsService: NotificationsService) {
    this.shiftService.getAll().subscribe(shifts => this.shifts = shifts);
    this.employeeService.getAll().subscribe(employees => this.employees = employees);
  }

  get tableData(): Observable<RowGroupData[]> {
    return this.paginationService.onValueChange
      .pipe(
        flatMap(daysInMonth => {
          this.calendarDays = daysInMonth;
          return forkJoin([
            this.mainShiftCompositionService.getAll(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.substitutionShiftCompositionService
              .getAll(
                daysInMonth[0].isoString,
                daysInMonth[daysInMonth.length - 1].isoString),
            this.scheduleService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.workingNormService.getAll(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString)
          ]).pipe(map(values => {
            this.scheduleDto = values[2];

            const rowGroupData = this.tableDataCollector.getTableData(daysInMonth, this.shifts, values[0], values[1], values[2], values[3]);
            this.sumCalculator.calculateWorkHoursSum(rowGroupData);
            return rowGroupData;
          }))
        }),
      );
  }

  open(groupData) {
    const data = {
      shiftId:      groupData.groupId,
      shifts:       this.shifts,
      employees:    this.employees,
      calendarDays: this.calendarDays
    };

    this.dialog.open(MainShiftCompositionDialogComponent, {data: data})
      .afterClosed()
      .subscribe((value: MainShiftComposition) => {
        if (value) {
          if (value.id) {
            // this.mainShiftCompositionService.update(value)
            //   .subscribe((res) => this.notificationsService.success(res))

          } else {
            this.mainShiftCompositionService.create(value)
              .subscribe((res) => {
                if (this.scheduleDto && this.calendarDays) {
                  let dto = this.scheduleDto.find(dto => dto.parent.id === value.employee.id);
                  groupData.rowData.push(this.rowDataCollector.getRowData(dto, this.calendarDays, value, null));
                  this.tableRenderer.renderRowGroup(groupData.groupId);
                  this.notificationsService.success(res);
                }
              });
          }
        }
      });
  }
}
