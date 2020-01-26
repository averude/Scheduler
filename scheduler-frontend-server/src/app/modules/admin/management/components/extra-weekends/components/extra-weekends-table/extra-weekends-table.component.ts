import { Component } from '@angular/core';
import { ExtraWeekend } from "../../../../../../../model/extra-weekend";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { ExtraWeekendService } from "../../../../../../../http-services/extra-weekend.service";
import { ExtraWeekendsDialogComponent } from "../extra-weekends-dialog/extra-weekends-dialog.component";
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { DatePaginationService } from "../../../../../../../lib/ngx-schedule-table/service/date-pagination.service";

@Component({
  selector: 'app-extra-weekends-table',
  templateUrl: './extra-weekends-table.component.html',
  styleUrls: [
    '../../../../../../../shared/common/table.common.css',
    './extra-weekends-table.component.css'
  ],
  providers: [DatePaginationService]
})
export class ExtraWeekendsTableComponent extends PageableTableBaseComponent<ExtraWeekend> {

  displayedColumns = ['select', 'date', 'control'];

  constructor(datePaginationService: DatePaginationService,
              dialog: MatDialog,
              notificationsService: NotificationsService,
              extraWeekendService: ExtraWeekendService) {
    super(datePaginationService, dialog, extraWeekendService, notificationsService);
  }

  openDialog(extraWeekend: ExtraWeekend) {
    const data = {
      extraWeekend: extraWeekend
    };

    this.openAddOrEditDialog(extraWeekend, data, ExtraWeekendsDialogComponent);
  }
}
