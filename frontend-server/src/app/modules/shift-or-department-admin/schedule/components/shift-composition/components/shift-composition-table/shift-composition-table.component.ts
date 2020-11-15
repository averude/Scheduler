import { Component } from '@angular/core';
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { ShiftComposition } from "../../../../../../../model/shift-composition";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { ShiftCompositionService } from "../../../../../../../services/http/shift-composition.service";
import { ShiftCompositionDialogComponent } from "../shift-composition-dialog/shift-composition-dialog.component";
import { EmployeeService } from "../../../../../../../services/http/employee.service";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";
import { getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";

@Component({
  selector: 'app-shift-composition-table',
  templateUrl: './shift-composition-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css',
    './shift-composition-table.component.css'],
  providers: [PaginationService]
})
export class ShiftCompositionTableComponent extends PageableTableBaseComponent<ShiftComposition> {
  displayedColumns = ['select', 'shift', 'employee', 'date_range', 'substitution', 'control'];

  employees:  Employee[]  = [];
  shifts:     Shift[]     = [];

  constructor(datePaginationService: PaginationService,
              dialog: MatDialog,
              shiftScheduleService: ShiftCompositionService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService,
              private shiftCompositionService: ShiftCompositionService,
              notificationsService: NotificationsService) {
    super(datePaginationService, dialog, shiftScheduleService, notificationsService);
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

  getEmployeeShortName(employee: Employee): string {
    return getEmployeeShortName(employee);
  }

  getShift(shiftId: number): Shift {
    return this.shifts.find(value => value.id === shiftId);
  }
}