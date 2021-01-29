import { Component } from '@angular/core';
import { Department } from "../../../../../model/department";
import { MatDialog } from "@angular/material/dialog";
import { DepartmentService } from "../../../../../services/http/department.service";
import { NotificationsService } from "angular2-notifications";
import { DepartmentDialogComponent } from "../department-dialog/department-dialog.component";
import { TableBaseIdEntityComponent } from "../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";

@Component({
  selector: 'app-departments-table',
  templateUrl: './departments-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './departments-table.component.css']
})
export class DepartmentsTableComponent extends TableBaseIdEntityComponent<Department> {
  displayedColumns = ['select', 'name', 'control'];

  constructor(dialog: MatDialog,
              departmentService: DepartmentService,
              notificationsService: NotificationsService) {
    super(dialog, departmentService, notificationsService);
  }

  openDialog(department: Department) {
    const data = {
      department:   department
    };

    this.openAddOrEditDialog(department, data, DepartmentDialogComponent);
  }

}

