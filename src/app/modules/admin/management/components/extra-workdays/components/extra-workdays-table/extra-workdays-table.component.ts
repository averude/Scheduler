import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { ExtraWorkDay } from "../../../../../../../model/extra-workday";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { Component } from "@angular/core";
import { ExtraWorkdayService } from "../../../../../../../services/extra-workday.service";
import { ExtraWorkdaysDialogComponent } from "../extra-workdays-dialog/extra-workdays-dialog.component";
import { DatePaginationService } from "../../../../../../../lib/ngx-schedule-table/service/date-pagination.service";

@Component({
  selector: 'app-extra-workdays-table',
  templateUrl: './extra-workdays-table.component.html',
  styleUrls: [
    '../../../../../../../shared/common/table.common.css',
    './extra-workdays-table.component.css'
  ],
  providers: [DatePaginationService]
})
export class ExtraWorkdaysTableComponent extends PageableTableBaseComponent<ExtraWorkDay> {

  displayedColumns = ['select', 'date', 'control'];

  constructor(datePaginationService: DatePaginationService,
              dialog: MatDialog,
              notificationsService: NotificationsService,
              extraWorkDayService: ExtraWorkdayService) {
    super(datePaginationService, dialog, extraWorkDayService, notificationsService);
  }

  openDialog(extraWorkDay: ExtraWorkDay) {
    const data = {
      extraWorkDay: extraWorkDay
    };

    this.openAddOrEditDialog(extraWorkDay, data, ExtraWorkdaysDialogComponent);
  }
}
