import { Component } from '@angular/core';
import { TableBaseComponent } from "../../../../../shared/abstract-components/table-base/table-base.component";
import { Department } from "../../../../../model/department";
import { MatDialog } from "@angular/material";
import { DepartmentService } from "../../../../../services/department.service";
import { NotificationsService } from "angular2-notifications";
import { DepartmentDialogComponent } from "../department-dialog/department-dialog.component";
import { DepartmentIconService } from "../../../../../services/department-icon.service";
import { DepartmentIcon } from "../../../../../model/department-icon";

@Component({
  selector: 'app-departments-table',
  templateUrl: './departments-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './departments-table.component.css']
})
export class DepartmentsTableComponent extends TableBaseComponent<Department> {
  displayedColumns = ['select', 'name', 'icon', 'control'];

  departmentIcons: DepartmentIcon[] = [];

  constructor(dialog: MatDialog,
              departmentService: DepartmentService,
              notificationsService: NotificationsService,
              private departmentIconService: DepartmentIconService) {
    super(dialog, departmentService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.departmentIconService.getAll()
      .subscribe(icons => this.departmentIcons = icons)
  }

  openDialog(department: Department) {
    const data = {
      department: department,
      icons: this.departmentIcons
    };

    this.openAddOrEditDialog(department, data, DepartmentDialogComponent);
  }

  getDepartmentIconById(id: number): DepartmentIcon {
    return this.departmentIcons.find(value => value.id === id);
  }
}
