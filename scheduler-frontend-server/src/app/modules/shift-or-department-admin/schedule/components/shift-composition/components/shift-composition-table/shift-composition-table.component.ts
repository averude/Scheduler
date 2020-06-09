import { Component } from '@angular/core';
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { ShiftComposition } from "../../../../../../../model/shift-composition";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { ShiftCompositionService } from "../../../../../../../http-services/shift-composition.service";
import { ShiftCompositionDialogComponent } from "../shift-composition-dialog/shift-composition-dialog.component";
import { EmployeeService } from "../../../../../../../http-services/employee.service";
import { ShiftService } from "../../../../../../../http-services/shift.service";
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
  displayedColumns = ['select', 'shift', 'employee', 'from', 'to', 'substitution', 'control'];

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

  getEmployeeShortName(employeeId: number): string {
    return getEmployeeShortName(this.employees.find(employee => employee.id === employeeId));
  }

  getShift(shiftId: number): Shift {
    return this.shifts.find(value => value.id === shiftId);
  }

  generate() {
    this.employees.forEach(employee => {
      this.shiftCompositionService.create({
        id: null,
        employeeId: employee.id,
        shiftId: this.shifts[0].id,
        substitution: false,
        from: "2020-01-01",
        to: "2020-12-31"
      }).subscribe(res => console.log(res));
    })
  }
}
