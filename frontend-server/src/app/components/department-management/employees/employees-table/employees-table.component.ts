import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { EmployeeService } from "../../../../services/http/employee.service";
import { Employee } from "../../../../model/employee";
import { EmployeeDialogComponent } from "../employee-dialog/employee-dialog.component";
import { NotificationsService } from "angular2-notifications";
import { HasDepartmentTableComponent } from "../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-mat-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['../../../../shared/common/table.common.css','./employees-table.component.css']
})
export class EmployeesTableComponent extends HasDepartmentTableComponent<Employee> {
  displayedColumns = ['select', 'secondName', 'firstName', 'patronymic', 'control'];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private employeeService: EmployeeService,
              private activatedRoute: ActivatedRoute) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.departmentId),
      employeeService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.secondName.toLowerCase().includes(filter)
        || data.firstName.toLowerCase().includes(filter)
        || data.patronymic.toLowerCase().includes(filter);
    });
  }

  openDialog(employee: Employee) {
    const data = {
      employee: employee
    };

    this.openAddOrEditDialog(employee, data, EmployeeDialogComponent);
  }
}
