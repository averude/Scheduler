import { Component } from '@angular/core';
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { HolidayService } from "../../../../../../../services/holiday.service";
import { Holiday } from "../../../../../../../model/holiday";
import { HolidaysDialogComponent } from "../holidays-dialog/holidays-dialog.component";
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";

@Component({
  selector: 'app-holidays-table',
  templateUrl: './holidays-table.component.html',
  styleUrls: [
    '../../../../../../../shared/common/table.common.css',
    './holidays-table.component.css'
  ],
  providers: [PaginatorService]
})
export class HolidaysTableComponent extends PageableTableBaseComponent<Holiday> {

  displayedColumns = ['select', 'date', 'name', 'control'];

  constructor(paginatorService: PaginatorService,
              dialog: MatDialog,
              notificationsService: NotificationsService,
              holidayService: HolidayService) {
    super(paginatorService, dialog, holidayService, notificationsService);
  }

  openDialog(holiday: Holiday) {
    const data = {
      holiday: holiday
    };

    this.openAddOrEditDialog(holiday, data, HolidaysDialogComponent);
  }
}
