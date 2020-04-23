import { Component } from '@angular/core';
import { Department } from "../../../../../model/department";
import { MatDialog } from "@angular/material/dialog";
import { DepartmentService } from "../../../../../http-services/department.service";
import { NotificationsService } from "angular2-notifications";
import { DepartmentDialogComponent } from "../department-dialog/department-dialog.component";
import { EnterpriseService } from "../../../../../http-services/enterprise.service";
import { Enterprise } from "../../../../../model/enterprise";
import { PageableByEnterpriseIdTableBaseComponent } from "../../../../../shared/abstract-components/table-base/pageable-by-enterprise-id-table-base.component";
import { PaginationService } from "../../../../../lib/ngx-schedule-table/service/pagination.service";

@Component({
  selector: 'app-departments-table',
  templateUrl: './departments-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css', './departments-table.component.css']
})
export class DepartmentsTableComponent extends PageableByEnterpriseIdTableBaseComponent<Department> {
  displayedColumns = ['select', 'enterprise', 'name', 'control'];

  enterprises: Enterprise[] = [];

  constructor(paginationService: PaginationService,
              dialog: MatDialog,
              departmentService: DepartmentService,
              private enterpriseService: EnterpriseService,
              notificationsService: NotificationsService) {
    super(paginationService, dialog, departmentService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.enterpriseService.getAllByAuth()
      .subscribe(enterprises => this.enterprises = enterprises);
  }

  openDialog(department: Department) {
    const data = {
      department:   department,
      enterprises:  this.enterprises
    };

    this.openAddOrEditDialog(department, data, DepartmentDialogComponent);
  }

  getEnterprise(enterpriseId: number): Enterprise {
    return this.enterprises.find(enterprise => enterprise.id === enterpriseId);
  }
}

