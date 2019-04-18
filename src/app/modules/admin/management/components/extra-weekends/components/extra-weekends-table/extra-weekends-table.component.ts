import { Component } from '@angular/core';
import { ExtraWeekend } from "../../../../../../../model/extra-weekend";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { ExtraWeekendService } from "../../../../../../../services/extra-weekend.service";
import { ExtraWeekendsDialogComponent } from "../extra-weekends-dialog/extra-weekends-dialog.component";
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";

@Component({
  selector: 'app-extra-weekends-table',
  templateUrl: './extra-weekends-table.component.html',
  styleUrls: [
    '../../../../../../../shared/common/table.common.css',
    './extra-weekends-table.component.css'
  ]
})
export class ExtraWeekendsTableComponent extends PageableTableBaseComponent<ExtraWeekend> {

  displayedColumns = ['select', 'date', 'control'];

  constructor(paginatorService: PaginatorService,
              dialog: MatDialog,
              notificationsService: NotificationsService,
              extraWeekendService: ExtraWeekendService) {
    super(paginatorService, dialog, extraWeekendService, notificationsService);
  }

  openDialog(extraWeekend: ExtraWeekend) {
    const data = {
      extraWeekend: extraWeekend
    };

    this.openAddOrEditDialog(extraWeekend, data, ExtraWeekendsDialogComponent);
  }
}
