import { Component } from '@angular/core';
import { DayType } from "../../../../../../../model/daytype";
import { DayTypeService } from "../../../../../../../services/daytype.service";
import { NotificationsService } from "angular2-notifications";
import { MatDialog } from "@angular/material";
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { DayTypeDialogComponent } from "../daytype-dialog/daytype-dialog.component";

@Component({
  selector: 'app-mat-daytypes-table',
  templateUrl: './daytypes-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css','./daytypes-table.component.css']
})
export class DayTypesTableComponent extends TableBaseComponent<DayType> {
  displayedColumns = ['select', 'name', 'label', 'control'];

  constructor(dialog: MatDialog,
              dayTypeService: DayTypeService,
              notificationsService: NotificationsService) {
    super(dialog, dayTypeService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter)
    });
  }

  openDialog(dayType: DayType) {
    const data = {
      dayType: dayType,
    };

    this.openAddOrEditDialog(dayType, data, DayTypeDialogComponent);
  }
}
