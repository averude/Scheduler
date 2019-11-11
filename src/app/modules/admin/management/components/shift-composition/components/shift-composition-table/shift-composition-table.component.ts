import { Component } from '@angular/core';
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { ShiftComposition } from "../../../../../../../model/shift-composition";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { ShiftCompositionService } from "../../../../../../../services/shift-composition.service";
import { ShiftCompositionDialogComponent } from "../shift-composition-dialog/shift-composition-dialog.component";
import { EmployeeService } from "../../../../../../../services/employee.service";
import { ShiftService } from "../../../../../../../services/shift.service";
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";
import { getEmployeeShortName } from "../../../../../../../shared/utils/utils";

@Component({
  selector: 'app-shift-composition-table',
  templateUrl: './shift-composition-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css',
    './shift-composition-table.component.css'],
  providers: [PaginatorService]
})
export class ShiftCompositionTableComponent extends PageableTableBaseComponent<ShiftComposition> {
  displayedColumns = ['select', 'shift', 'employee', 'from', 'to', 'substitution', 'control'];

  employees:  Employee[]  = [];
  shifts:     Shift[]     = [];

  constructor(paginatorService: PaginatorService,
              dialog: MatDialog,
              shiftScheduleService: ShiftCompositionService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService,
              notificationsService: NotificationsService) {
    super(paginatorService, dialog, shiftScheduleService, notificationsService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.employeeService.getAll().subscribe(employees => this.employees = employees);
    this.shiftService.getAll().subscribe(shifts => this.shifts = shifts);
  }

  openDialog(shiftSchedule: ShiftComposition) {
    const data = {
      shiftSchedule: shiftSchedule,
      shifts: this.shifts,
      employees: this.employees
    };

    this.openAddOrEditDialog(shiftSchedule, data, ShiftCompositionDialogComponent);
  }

  getEmployeeShortName(employeeId: number): string {
    return getEmployeeShortName(this.employees.find(employee => employee.id === employeeId));
  }

  getShiftName(shiftId: number): string {
    return this.shifts.find(value => value.id === shiftId).name;
  }

}
