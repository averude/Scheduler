import { Component } from '@angular/core';
import { DayType } from "../../../../../model/day-type";
import { DayTypeService } from "../../../../../http-services/day-type.service";
import { NotificationsService } from "angular2-notifications";
import { MatDialog } from "@angular/material/dialog";
import { DayTypeDialogComponent } from "../daytype-dialog/daytype-dialog.component";
import { DayTypeGroupService } from "../../../../../http-services/day-type-group.service";
import { DayTypeGroup } from "../../../../../model/day-type-group";
import { EnterpriseService } from "../../../../../http-services/enterprise.service";
import { Enterprise } from "../../../../../model/enterprise";
import { PageableByEnterpriseIdTableBaseComponent } from "../../../../../shared/abstract-components/table-base/pageable-by-enterprise-id-table-base.component";
import { PaginationService } from "../../../../../lib/ngx-schedule-table/service/pagination.service";

@Component({
  selector: 'app-mat-daytypes-table',
  templateUrl: './daytypes-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css','./daytypes-table.component.css']
})
export class DayTypesTableComponent extends PageableByEnterpriseIdTableBaseComponent<DayType> {
  dayTypeGroups: DayTypeGroup[] = [];
  enterprises: Enterprise[] = [];

  displayedColumns = ['select', 'name', 'label', 'group', 'use_previous_value', 'control'];

  constructor(paginationService: PaginationService,
              dialog: MatDialog,
              dayTypeService: DayTypeService,
              notificationsService: NotificationsService,
              private dayTypeGroupService: DayTypeGroupService,
              private enterpriseService: EnterpriseService) {
    super(paginationService, dialog, dayTypeService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter)
    });
    this.dayTypeGroupService.getAllByAuth()
      .subscribe(dayTypeGroups => this.dayTypeGroups = dayTypeGroups);
    this.enterpriseService.getAllByAuth()
      .subscribe(enterprises => this.enterprises = enterprises);
  }

  openDialog(dayType: DayType) {
    const data = {
      dayType:        dayType,
      dayTypeGroups:  this.dayTypeGroups,
      enterprises:    this.enterprises
    };

    this.openAddOrEditDialog(dayType, data, DayTypeDialogComponent);
  }

  getGroupById(id: number): DayTypeGroup {
    return this.dayTypeGroups.find(value => value.id === id);
  }

  // getWorkTimeString(dayType: DayType): string {
  //   return dayType.startTime && dayType.endTime ? dayType.startTime + ' - ' + dayType.endTime : '-';
  // }
  //
  // getBreakTimeString(dayType: DayType): string {
  //   return dayType.breakStartTime && dayType.breakEndTime ? dayType.breakStartTime + ' - ' + dayType.breakEndTime : '-';
  // }
}
