import { Component } from '@angular/core';
import { TableBaseComponent } from "../../../../../shared/abstract-components/table-base/table-base.component";
import { Enterprise } from "../../../../../model/enterprise";
import { MatDialog } from "@angular/material";
import { EnterpriseService } from "../../../../../services/http/enterprise.service";
import { NotificationsService } from "angular2-notifications";
import { EnterpriseDialogComponent } from "../enterprise-dialog/enterprise-dialog.component";

@Component({
  selector: 'app-enterprises-table',
  templateUrl: './enterprises-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css',
    './enterprises-table.component.css']
})
export class EnterprisesTableComponent extends TableBaseComponent<Enterprise> {
  displayedColumns = ['select', 'name', 'control'];

  constructor(dialog: MatDialog,
              enterpriseService: EnterpriseService,
              notificationsService: NotificationsService) {
    super(dialog, enterpriseService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  openDialog(enterprise: Enterprise) {
    const data = {
      enterprise: enterprise
    };

    this.openAddOrEditDialog(enterprise, data, EnterpriseDialogComponent);
  }

}
