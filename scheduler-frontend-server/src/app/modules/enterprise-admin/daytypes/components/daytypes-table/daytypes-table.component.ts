import { Component } from '@angular/core';
import { DayType } from "../../../../../model/day-type";
import { DayTypeService } from "../../../../../http-services/day-type.service";
import { NotificationsService } from "angular2-notifications";
import { MatDialog } from "@angular/material/dialog";
import { DayTypeDialogComponent } from "../daytype-dialog/daytype-dialog.component";
import { DayTypeGroupService } from "../../../../../http-services/day-type-group.service";
import { DayTypeGroup } from "../../../../../model/day-type-group";
import { TableBaseComponent } from "../../../../../shared/abstract-components/table-base/table-base.component";

@Component({
  selector: 'app-mat-daytypes-table',
  templateUrl: './daytypes-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css','./daytypes-table.component.css']
})
export class DayTypesTableComponent extends TableBaseComponent<DayType> {
  dayTypeGroups: DayTypeGroup[] = [];

  displayedColumns = ['select', 'name', 'label', 'group', 'use_previous_value', 'control'];

  constructor(dialog: MatDialog,
              dayTypeService: DayTypeService,
              notificationsService: NotificationsService,
              private dayTypeGroupService: DayTypeGroupService,) {
    super(dialog, dayTypeService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter)
    });
    this.dayTypeGroupService.getAll()
      .subscribe(dayTypeGroups => this.dayTypeGroups = dayTypeGroups);
  }

  openDialog(dayType: DayType) {
    const data = {
      dayType:        dayType,
      dayTypeGroups:  this.dayTypeGroups,
    };

    this.openAddOrEditDialog(dayType, data, DayTypeDialogComponent);
  }
}