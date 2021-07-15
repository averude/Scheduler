import { Component } from '@angular/core';
import { TableBaseIdEntityComponent } from "../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { DayTypeGroup } from "../../../../../model/day-type-group";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { DayTypeGroupService } from "../../../../../services/http/day-type-group.service";
import { DayTypeGroupsDialogComponent } from "../day-type-groups-dialog/day-type-groups-dialog.component";

@Component({
  selector: 'app-day-type-groups-table',
  templateUrl: './day-type-groups-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css',
    './day-type-groups-table.component.css']
})
export class DayTypeGroupsTableComponent extends TableBaseIdEntityComponent<DayTypeGroup> {

  displayedColumns = ['select', 'name', 'color', 'control'];

  constructor(dialog: MatDialog,
              dayTypeGroupService: DayTypeGroupService,
              notificationsService: NotificationsService,) {
    super(dialog, dayTypeGroupService, notificationsService);
  }

  openDialog(dayTypeGroup: DayTypeGroup) {
    const data = {
      dayTypeGroup: dayTypeGroup
    };

    this.openAddOrEditDialog(dayTypeGroup, data, DayTypeGroupsDialogComponent);
  }
}
