import { Component } from '@angular/core';
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { ShiftSchedule } from "../../../../../../../model/shift-schedule";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { ShiftScheduleService } from "../../../../../../../services/shift-schedule.service";
import { ShiftCompositionDialogComponent } from "../shift-composition-dialog/shift-composition-dialog.component";
import { EmployeeService } from "../../../../../../../services/employee.service";
import { ShiftService } from "../../../../../../../services/shift.service";
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";

@Component({
  selector: 'app-shift-composition-table',
  templateUrl: './shift-composition-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css',
    './shift-composition-table.component.css'],
  providers: [PaginatorService]
})
export class ShiftCompositionTableComponent extends PageableTableBaseComponent<ShiftSchedule> {
  displayedColumns = ['select', 'shift', 'employee', 'from', 'to', 'substitution', 'control'];

  employees:  Employee[]  = [];
  shifts:     Shift[]     = [];

  constructor(paginatorService: PaginatorService,
              dialog: MatDialog,
              shiftScheduleService: ShiftScheduleService,
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

  openDialog(shiftSchedule: ShiftSchedule) {
    const data = {
      shiftSchedule: shiftSchedule,
      shifts: this.shifts,
      employees: this.employees
    };

    this.openAddOrEditDialog(shiftSchedule, data, ShiftCompositionDialogComponent);
  }

}
