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
import { TableSumCalculator } from "../../../../../../services/calculators/table-sum-calculator.service";
import { Shift } from "../../../../../../model/shift";
import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";
import { MatDialog } from "@angular/material/dialog";
import { MainShiftCompositionDialogComponent } from "../table-edit-mode-control/components/main-shift-composition-dialog/main-shift-composition-dialog.component";
import { MainShiftComposition, SubstitutionShiftComposition } from "../../../../../../model/main-shift-composition";
import { BasicDto } from "../../../../../../model/dto/basic-dto";
import { Employee } from "../../../../../../model/employee";
import { WorkDay } from "../../../../../../model/workday";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { NotificationsService } from "angular2-notifications";
import { TableRenderer } from "../../../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { RowDataCollector } from "../table-edit-mode-control/row-data-collector";
import { Row, RowGroup } from "../model/table-data";
import { AuthService } from "../../../../../../services/http/auth.service";
import { WorkingNorm } from "../../../../../../model/working-norm";
import { TableTreeDataCollector } from "./table-tree-data-collector";
import { CellEnabledSetter } from "./cell-enabled-setter";

@Injectable()
export class TableDataSource {

  private shifts: Shift[];
  private employees: Employee[];
  private mainCompositions: MainShiftComposition[];
  private substitutionCompositions: SubstitutionShiftComposition[];
  private scheduleDto: BasicDto<Employee, WorkDay>[];
  private workingNorms: WorkingNorm[];
  private calendarDays: CalendarDay[];

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private cellEnabledSetter: CellEnabledSetter,
              private treeDataCollector: TableTreeDataCollector,
              private tableRenderer: TableRenderer,
              private rowDataCollector: RowDataCollector,
              private sumCalculator: TableSumCalculator,
              private paginationService: PaginationService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService,
              private mainShiftCompositionService: MainShiftCompositionService,
              private substitutionShiftCompositionService: SubstitutionShiftCompositionService,
              private scheduleService: ScheduleService,
              private workingNormService: WorkingNormService,
              private notificationsService: NotificationsService) {
  }

  get tableData(): Observable<RowGroupData[]> {
    if (this.authService.currentUserValue.roles.includes('DEPARTMENT_ADMIN')) {
      this.employeeService.getAll().subscribe(employees => this.employees = employees);
    }

    this.shiftService.getAll().subscribe(shifts => this.shifts = shifts);

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
            this.mainCompositions = values[0];
            this.substitutionCompositions = values[1];
            this.scheduleDto = values[2];
            this.workingNorms = values[3];

            const rowGroupData = this.treeDataCollector.createTree(this.shifts, values[0], values[1], daysInMonth, this.scheduleDto, values[3]).groups;

            this.sumCalculator.calculateWorkHoursSum(rowGroupData);
            return rowGroupData;
          }))
        }),
      );
  }

  newRow(rowGroup: RowGroup) {
    const employeeIds = this.mainCompositions
      .filter(value => value.shiftId === rowGroup.id)
      .map(value => value.employee.id);

    const notInShiftEmployees = this.employees
      .filter(value => !employeeIds.includes(value.id));

    const data = {
      shiftId:      rowGroup.id,
      shifts:       this.shifts,
      employees:    notInShiftEmployees,
      calendarDays: this.calendarDays
    };

    this.openDialog(data, rowGroup);
  }

  editRow(row: Row) {
    if (!row || !row.group) {
      return;
    }

    const groupData = row.group;
    const data = {
      shiftSchedule:  row.composition,
      shiftId:        groupData.id,
      shifts:         this.shifts,
      employees:      this.employees,
      calendarDays:   this.calendarDays
    };

    this.openDialog(data, groupData);
  }

  private openDialog(data, rowGroup: RowGroup) {
    this.dialog.open(MainShiftCompositionDialogComponent, {data: data})
      .afterClosed()
      .subscribe((dialogData) => {
        if (!dialogData) {
          return;
        }

        const composition: MainShiftComposition = dialogData.data;
        switch (dialogData.command) {

          case 'save' : {
            this.createOrUpdateComposition(composition, rowGroup);
            break;
          }

          case 'delete' : {
            this.removeComposition(composition, rowGroup);
            break;
          }

          default : {
            throw new Error('Wrong command');
          }
        }
      });
  }

  private createOrUpdateComposition(composition: MainShiftComposition,
                                    rowGroup: RowGroup) {
    if (composition) {
      if (composition.id) {
        this.mainShiftCompositionService.update(composition)
          .subscribe((res) => {
            this.updateRow(composition, rowGroup);
          });
      } else {
        this.mainShiftCompositionService.create(composition)
          .subscribe((id) => {
            this.createRow(composition, rowGroup, id);
          });
      }
    }
  }

  private removeComposition(value: MainShiftComposition, groupData: RowGroup) {
    if (value.id) {
      this.mainShiftCompositionService.delete(value.id)
        .subscribe(res => {
          groupData.removeRow(value.employee.id);
          const idx = this.mainCompositions.findIndex(val => val.id === value.id);
          this.mainCompositions.splice(idx, 1);

          this.tableRenderer.renderRowGroup(groupData.id);
          this.notificationsService.success(res);
        });
    }
  }

  private createRow(value: MainShiftComposition,
                    group: RowGroup,
                    id: number) {
    if (this.scheduleDto && this.calendarDays) {
      value.id = id;
      const dto = this.scheduleDto.find(dto => dto.parent.id === value.employee.id);
      const hoursNorm = this.workingNorms.find(norm => norm.shiftId === group.id)?.hours;

      this.mainCompositions.push(value);
      const row = this.treeDataCollector.createRow(null, value, this.calendarDays, dto, hoursNorm);

      group.addRow(row);
      this.cellEnabledSetter.setRowEnabledCells(row);
      this.sumCalculator.calculateWorkHoursSum([group]);

      this.tableRenderer.renderRowGroup(group.id);
      this.notificationsService.success(id);
    }
  }

  private updateRow(value: MainShiftComposition, group: RowGroup) {
    const index = this.mainCompositions.findIndex(val => val.id === value.id);
    if (index >= 0) {
      this.mainCompositions.splice(index, 1, value);
      const row = group.findRow(value.employee.id);
      row.composition = value;

      this.cellEnabledSetter.setRowEnabledCells(row, this.substitutionCompositions);
      this.reassignCells(row);

      this.sumCalculator.calculateWorkHoursSum([group]);

      this.tableRenderer.renderRow(row.id);
      this.notificationsService.success('Updated');
    }
  }

  private reassignCells(row) {
    const oldCells = row.cellData;
    const newCells = [];
    oldCells.forEach(cell => newCells.push(Object.assign({}, cell)));
    row.cellData = newCells;
  }
}
