import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
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
              private shiftService: ShiftService) { super(); }

  ngOnInit() {
    this.initDataSource();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.secondName.toLowerCase().includes(filter)
        || data.firstName.toLowerCase().includes(filter)
        || data.patronymic.toLowerCase().includes(filter)
        || this.getPositionName(data.positionId).toLowerCase().includes(filter)
        || this.getShiftName(data.shiftId).toLowerCase().includes(filter);
    });
    this.employeeService.getAll()
      .subscribe(employees => this.dataSource.data = employees
        .sort(((a, b) => a.shiftId - b.shiftId))); // move to backend
    this.positionService.getAll()
      .subscribe(positions => this.positions = positions);
    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);
  }

  openDialog(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      employee: employee,
      positions: this.positions,
      shifts: this.shifts
    };

    let dialogRef = this.dialog.open(EmployeeDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(value => {
        if (!value) {
          return;
        }
        if (value.id) {
          this.employeeService.update(value)
            .subscribe(res => {
              this.updateRow(value, employee);
              this.notificationsService
                .success(
                  'Updated',
                  `Employee "${value.secondName} ${value.firstName}" was successfully updated`);
            });
        } else {
          this.employeeService.create(value)
            .subscribe(res => {
              value.id = res;
              this.addRow(value);
              this.notificationsService
                .success(
                  'Created',
                  `Employee "${value.secondName} ${value.firstName}" was successfully created`)
            });
        }
      })
  }

  removeDialog() {
    this.openRemoveDialog(this.dialog);
  }

  removeSelected() {
    this.selection.selected.forEach(employee => {
      this.employeeService.remove(employee.id)
        .subscribe(res => {
          this.removeRow(employee);
          this.notificationsService
            .success(
              'Deleted',
              `Employee "${employee.secondName} ${employee.firstName}" was successfully deleted`);
        });
    });
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
