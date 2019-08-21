import { Component } from '@angular/core';
import { MatDialog } from "@angular/material";
import { EmployeeService } from "../../../../../../../services/employee.service";
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";
import { Position } from "../../../../../../../model/position";
import { PositionService } from "../../../../../../../services/position.service";
import { ShiftService } from "../../../../../../../services/shift.service";
import { EmployeeDialogComponent } from "../employee-dialog/employee-dialog.component";
import { NotificationsService } from "angular2-notifications";
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";

@Component({
  selector: 'app-mat-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css','./employees-table.component.css']
})
export class EmployeesTableComponent extends TableBaseComponent<Employee> {
  displayedColumns = ['select', 'secondName', 'firstName', 'patronymic', 'positionId', 'shiftId', 'control'];

  positions: Position[] = [];
  shifts: Shift[] = [];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private employeeService: EmployeeService,
              private positionService: PositionService,
              private shiftService: ShiftService) {
    super(dialog, employeeService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.secondName.toLowerCase().includes(filter)
        || data.firstName.toLowerCase().includes(filter)
        || data.patronymic.toLowerCase().includes(filter)
        || this.getPositionName(data.positionId).toLowerCase().includes(filter)
        || this.getShiftName(data.shiftId).toLowerCase().includes(filter);
    });
    this.positionService.getAll()
      .subscribe(positions => this.positions = positions);
    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);
  }

  openDialog(employee: Employee) {
    const data = {
      employee: employee,
      positions: this.positions,
      shifts: this.shifts
    };

    this.openAddOrEditDialog(employee, data, EmployeeDialogComponent);
  }

  getPositionName(positionId: number): string {
    let position = this.positions.find(value => value.id === positionId);
    if (position) {
      return position.name;
    } else {
      return '-';
    }
  }

  getShiftName(shiftId: number): string {
    let shift = this.shifts.find(value => value.id === shiftId);
    if (shift) {
      return shift.name;
    } else {
      return '-';
    }
  }
}
