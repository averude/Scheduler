import { Component } from '@angular/core';
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { HolidayService } from "../../../../../../../http-services/holiday.service";
import { Holiday } from "../../../../../../../model/holiday";
import { HolidaysDialogComponent } from "../holidays-dialog/holidays-dialog.component";
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { DatePaginationService } from "../../../../../../../lib/ngx-schedule-table/service/date-pagination.service";

@Component({
  selector: 'app-holidays-table',
  templateUrl: './holidays-table.component.html',
  styleUrls: [
    '../../../../../../../shared/common/table.common.css',
    './holidays-table.component.css'
  ],
  providers: [DatePaginationService]
})
export class HolidaysTableComponent extends PageableTableBaseComponent<Holiday> {

  displayedColumns = ['select', 'date', 'name', 'control'];

  constructor(datePaginationService: DatePaginationService,
              dialog: MatDialog,
              notificationsService: NotificationsService,
              holidayService: HolidayService) {
    super(datePaginationService, dialog, holidayService, notificationsService);
  }

  openDialog(holiday: Holiday) {
    const data = {
      holiday: holiday
    };

    this.openAddOrEditDialog(holiday, data, HolidaysDialogComponent);
  }
}
