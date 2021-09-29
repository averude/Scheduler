import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { SpecialCalendarDatesDialogComponent } from "../special-calendar-dates-dialog/special-calendar-dates-dialog.component";
import { HasEnterprisePageableTable } from "../../../../../shared/abstract-components/table-base/pageable-table-base.component";
import { SpecialCalendarDate } from "../../../../../model/special-calendar-date";
import { SpecialCalendarDateService } from "../../../../../services/http/special-calendar-date.service";
import { ActivatedRoute } from "@angular/router";
import { PaginationService } from "../../../../../shared/paginators/pagination.service";

@Component({
  selector: 'app-special-calendar-dates-table',
  templateUrl: './special-calendar-dates-table.component.html',
  styleUrls: [
    '../../../../../shared/common/table.common.css',
    './special-calendar-dates-table.component.css'
  ],
  providers: [PaginationService]
})
export class SpecialCalendarDatesTableComponent extends HasEnterprisePageableTable<SpecialCalendarDate> {

  displayedColumns = ['select', 'date', 'name', 'date_type', 'control'];

  constructor(datePaginationService: PaginationService,
              dialog: MatDialog,
              notificationsService: NotificationsService,
              specialCalendarDateService: SpecialCalendarDateService,
              private activatedRoute: ActivatedRoute) {
    super(datePaginationService, dialog,
      Number.parseInt(activatedRoute.parent.snapshot.params.enterpriseId),
      specialCalendarDateService, notificationsService);
  }

  openDialog(specialCalendarDate: SpecialCalendarDate) {
    const data = {
      specialCalendarDate: specialCalendarDate,
      enterpriseId:        this.enterpriseId
    };

    this.openAddOrEditDialog(specialCalendarDate, data, SpecialCalendarDatesDialogComponent);
  }
}
