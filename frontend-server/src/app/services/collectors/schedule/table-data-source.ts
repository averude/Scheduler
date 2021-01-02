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
import { Composition, MainShiftComposition } from "../../../model/main-shift-composition";
import { Employee } from "../../../model/employee";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { Row, RowGroup } from "../../../model/ui/schedule-table/table-data";
import { AuthService } from "../../http/auth.service";
import { WorkingNorm } from "../../../model/working-norm";
import { AddMainShiftCompositionDialogComponent } from "../../../modules/shift-or-department-admin/schedule/components/calendar/schedule-table-shift-composition-dialog/add-main-shift-composition-dialog/add-main-shift-composition-dialog.component";
import { TableDataCollector } from "./table-data-collector.service";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { TableCompositionHandler } from "./table-composition-handler";
import { EditCompositionsDialogComponent } from "../../../modules/shift-or-department-admin/schedule/components/calendar/schedule-table-shift-composition-dialog/edit-compositions-dialog/edit-compositions-dialog.component";
import { getEmployeeShortName } from "../../../shared/utils/utils";
import { PositionService } from "../../http/position.service";
import { SelectionData } from "../../../lib/ngx-schedule-table/model/selection-data";
import { AddSubstitutionCompositionDialogComponent } from "../../../modules/shift-or-department-admin/schedule/components/calendar/schedule-table-shift-composition-dialog/add-substitution-composition-dialog/add-substitution-composition-dialog.component";
import { CompositionDivider } from "../../divider/composition-divider.service";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { binarySearch } from "../../../shared/utils/collection-utils";

@Injectable()
export class TableDataSource {

  public  shifts:                   Shift[];
  public  positions:                Position[];

  private employees:                Employee[];
  private scheduleDto:              EmployeeScheduleDTO[];
  private workingNorms:             WorkingNorm[];
  private calendarDays:             CalendarDay[];

  constructor(private dialog: MatDialog,
              private tableCompositionHandler: TableCompositionHandler,
              private tableDataCollector: TableDataCollector,
              private divider: CompositionDivider,
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

    this.shiftService.getAll().subscribe(shifts => this.shifts = shifts);

    this.positionService.getAll().subscribe(positions => this.positions = positions);

    return this.paginationService.onValueChange
      .pipe(
        mergeMap(daysInMonth => {
          this.calendarDays = daysInMonth;
          return forkJoin([
            this.scheduleService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.workingNormService.getAll(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString)
          ]).pipe(map(values => {
            this.scheduleDto = values[0];
            this.workingNorms = values[1];

            const data = this.tableDataCollector.collect(this.shifts, daysInMonth, this.scheduleDto, this.workingNorms);

            data.groups.forEach(group =>
              group.rows.forEach((row: Row) => {

                if (row.isSubstitution) {
                  row.intervals = row.compositions.map(composition => convertCompositionToInterval(composition));
                } else {
                  const dto = binarySearch(this.scheduleDto, (mid => mid.parent.id - row.id));
                  row.intervals = this.divider.getRowIntervalsByArr(row.compositions, dto.substitutionShiftCompositions);
                }

                this.cellEnabledSetter.processRow(row, data.from, data.to);

              }));

            const rowGroupData = data.groups;

            this.sumCalculator.calculateWorkHoursSum(rowGroupData);
            return rowGroupData;
          }))
        }),
      );
  }

  newRow(rowGroup: RowGroup) {
    const data = {
      shiftId:      rowGroup.id,
      shifts:       this.shifts,
      employees:    this.employees,
      positions:    this.positions,
      calendarDays: this.calendarDays
    };

    this.dialog.open(AddMainShiftCompositionDialogComponent, {data: data})
      .afterClosed()
      .subscribe((mainShiftCompositions: MainShiftComposition[]) => {
        if (!mainShiftCompositions) {
          return;
        }

        mainShiftCompositions
          .forEach(composition =>
            this.tableCompositionHandler
              .createOrUpdateComposition([composition], rowGroup, null, null,
                this.scheduleDto, this.workingNorms, this.calendarDays, false));
      });
  }

  editRow(row: Row) {
    if (!row || !row.group) {
      return;
    }

    const groupData = row.group;
    const data = {
      compositions:   row.compositions,
      positions:      this.positions,
      calendarDays:   this.calendarDays,
      employeeName:   getEmployeeShortName(row.employee)
    };

    this.openDialog(data, groupData, row);
  }

  private openDialog(data, rowGroup: RowGroup, row: Row) {
    this.dialog.open(EditCompositionsDialogComponent, {data: data})
      .afterClosed()
      .subscribe((dialogData) => {
        if (!dialogData) {
          return;
        }

        const compositions: Composition[] = dialogData.data;
        switch (dialogData.command) {

          case 'save' : {
            this.tableCompositionHandler
              .createOrUpdateComposition(compositions, rowGroup, row, null,
                this.scheduleDto, this.workingNorms, this.calendarDays, row.isSubstitution);
            break;
          }

          case 'delete' : {
            this.tableCompositionHandler
              .removeComposition(rowGroup, row, this.scheduleDto, compositions);
            break;
          }

          default : {
            throw new Error('Wrong command');
          }
        }
      });
  }

  addSubstitutionDialog(selectionData: SelectionData) {
    const mainCompositionRow = <Row> selectionData.rowData;

    const data = {
      from: selectionData.selectedCells[0].date.isoString,
      to:   selectionData.selectedCells[selectionData.selectedCells.length - 1].date.isoString,
      shifts:     this.shifts,
      positions:  this.positions,
      employee:   mainCompositionRow.employee,
      mainShiftComposition: mainCompositionRow.compositions[0]
    };

    this.dialog.open(AddSubstitutionCompositionDialogComponent, {data: data})
      .afterClosed()
      .subscribe(value => {
        if (value) {
          const group = mainCompositionRow.group.table.findRowGroup(value.shiftId);
          this.tableCompositionHandler
            .createOrUpdateComposition([value], group, null, mainCompositionRow,
              this.scheduleDto, this.workingNorms, this.calendarDays, true);
        }
      });
  }
}
