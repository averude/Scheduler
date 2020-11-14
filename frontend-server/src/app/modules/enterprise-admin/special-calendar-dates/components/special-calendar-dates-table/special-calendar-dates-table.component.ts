import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { SpecialCalendarDatesDialogComponent } from "../special-calendar-dates-dialog/special-calendar-dates-dialog.component";
import { PageableTableBaseComponent } from "../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { PaginationService } from "../../../../../lib/ngx-schedule-table/service/pagination.service";
import { SpecialCalendarDate } from "../../../../../model/special-calendar-date";
import { SpecialCalendarDateService } from "../../../../../services/http/special-calendar-date.service";

@Component({
  selector: 'app-special-calendar-dates-table',
  templateUrl: './special-calendar-dates-table.component.html',
  styleUrls: [
    '../../../../../shared/common/table.common.css',
    './special-calendar-dates-table.component.css'
  ],
  providers: [PaginationService]
})
export class SpecialCalendarDatesTableComponent extends PageableTableBaseComponent<SpecialCalendarDate> {

  displayedColumns = ['select', 'date', 'name', 'date_type', 'control'];

  constructor(datePaginationService: PaginationService,
              dialog: MatDialog,
              notificationsService: NotificationsService,
              specialCalendarDateService: SpecialCalendarDateService) {
    super(datePaginationService, dialog, specialCalendarDateService, notificationsService);
  }

  openDialog(specialCalendarDate: SpecialCalendarDate) {
    const data = {
      specialCalendarDate: specialCalendarDate
    };

    this.openAddOrEditDialog(specialCalendarDate, data, SpecialCalendarDatesDialogComponent);
  }
}
