import { Component } from '@angular/core';
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { MainShiftComposition } from "../../../../../../../model/main-shift-composition";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { MainShiftCompositionService } from "../../../../../../../services/http/main-shift-composition.service";
import { MainShiftCompositionDialogComponent } from "../main-shift-composition-dialog/main-shift-composition-dialog.component";
import { EmployeeService } from "../../../../../../../services/http/employee.service";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";
import { getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { PaginationService } from "../../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { binarySearch } from "../../../../../../../shared/utils/collection-utils";

@Component({
  selector: 'app-main-shift-composition-table',
  templateUrl: './main-shift-composition-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css',
    './main-shift-composition-table.component.css'],
  providers: [PaginationService]
})
export class MainShiftCompositionTableComponent extends PageableTableBaseComponent<MainShiftComposition> {
  displayedColumns = ['select', 'shift', 'employee', 'date_range', 'control'];

  employees:  Employee[]  = [];
  shifts:     Shift[]     = [];

  constructor(datePaginationService: PaginationService,
              dialog: MatDialog,
              mainShiftCompositionService: MainShiftCompositionService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService,
              notificationsService: NotificationsService) {
    super(datePaginationService, dialog, mainShiftCompositionService, notificationsService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.employeeService.getAll().subscribe(employees => this.employees = employees);
    this.shiftService.getAll().subscribe(shifts => this.shifts = shifts);
  }

  openDialog(mainShiftComposition: MainShiftComposition) {
    const data = {
      shiftSchedule: mainShiftComposition,
      shifts: this.shifts,
      employees: this.employees
    };

    this.openAddOrEditDialog(mainShiftComposition, data, MainShiftCompositionDialogComponent);
  }

  getEmployeeShortName(employeeId: number): string {
    const employee = binarySearch(this.employees, mid => mid.id - employeeId);
    return getEmployeeShortName(employee);
  }

  getShift(shiftId: number): Shift {
    return this.shifts.find(value => value.id === shiftId);
  }
}
