import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { EmployeeService } from "../../../../../../../services/http/employee.service";
import { Employee } from "../../../../../../../model/employee";
import { Position } from "../../../../../../../model/position";
import { PositionService } from "../../../../../../../services/http/position.service";
import { EmployeeDialogComponent } from "../employee-dialog/employee-dialog.component";
import { NotificationsService } from "angular2-notifications";
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";

@Component({
  selector: 'app-mat-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css','./employees-table.component.css']
})
export class EmployeesTableComponent extends TableBaseComponent<Employee> {
  displayedColumns = ['select', 'secondName', 'firstName', 'patronymic', 'position', 'control'];

  positions: Position[] = [];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private employeeService: EmployeeService,
              private positionService: PositionService) {
    super(dialog, employeeService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.secondName.toLowerCase().includes(filter)
        || data.firstName.toLowerCase().includes(filter)
        || data.patronymic.toLowerCase().includes(filter)
        || data.position.name.toLowerCase().includes(filter);
    });
    this.positionService.getAll()
      .subscribe(positions => this.positions = positions);
  }

  openDialog(employee: Employee) {
    const data = {
      employee: employee,
      positions: this.positions
    };

    this.openAddOrEditDialog(employee, data, EmployeeDialogComponent);
  }
}
