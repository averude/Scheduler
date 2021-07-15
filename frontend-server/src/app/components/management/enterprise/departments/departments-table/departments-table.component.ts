import { Component } from '@angular/core';
import { Department } from "../../../../../model/department";
import { MatDialog } from "@angular/material/dialog";
import { DepartmentService } from "../../../../../services/http/department.service";
import { NotificationsService } from "angular2-notifications";
import { DepartmentDialogComponent } from "../department-dialog/department-dialog.component";
import { HasEnterpriseTableComponent } from "../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-departments-table',
  templateUrl: './departments-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './departments-table.component.css']
})
export class DepartmentsTableComponent extends HasEnterpriseTableComponent<Department> {
  displayedColumns = ['select', 'name', 'control'];

  constructor(dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              departmentService: DepartmentService,
              notificationsService: NotificationsService) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.enterpriseId),
      departmentService, notificationsService);
  }

  openDialog(department: Department) {
    const data = {
      department:   department,
      enterpriseId: this.enterpriseId
    };

    this.openAddOrEditDialog(department, data, DepartmentDialogComponent);
  }

}

