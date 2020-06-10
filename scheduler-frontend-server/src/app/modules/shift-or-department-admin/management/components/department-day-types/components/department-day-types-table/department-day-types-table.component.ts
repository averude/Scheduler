import { Component } from '@angular/core';
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { DayType } from "../../../../../../../model/day-type";
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { DepartmentDayType } from "../../../../../../../model/department-day-type";
import { DepartmentDayTypeService } from "../../../../../../../http-services/department-day-type.service";
import { DepartmentDayTypeDialogComponent } from "../department-day-type-dialog/department-day-type-dialog.component";
import { DayTypeService } from "../../../../../../../http-services/day-type.service";

@Component({
  selector: 'app-department-day-types-table',
  templateUrl: './department-day-types-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css','./department-day-types-table.component.css']
})
export class DepartmentDayTypesTableComponent extends TableBaseComponent<DepartmentDayType> {

  dayTypes:     DayType[]     = [];

  displayedColumns = ['select', 'name', 'label', 'work_time', 'break_time', 'control'];

  constructor(dialog: MatDialog,
              departmentDayTypeService: DepartmentDayTypeService,
              notificationsService: NotificationsService,
              private dayTypeService: DayTypeService) {
    super(dialog, departmentDayTypeService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dayTypeService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes);
  }

  openDialog(departmentDayType: DepartmentDayType) {
    const data = {
      departmentDayType:  departmentDayType,
      dayTypes:           this.dayTypes
    };

    this.openAddOrEditDialog(departmentDayType, data, DepartmentDayTypeDialogComponent);
  }

  getWorkTimeString(dayType: DayType): string {
    return dayType.startTime && dayType.endTime ? dayType.startTime + ' - ' + dayType.endTime : '-';
  }

  getBreakTimeString(dayType: DayType): string {
    return dayType.breakStartTime && dayType.breakEndTime ? dayType.breakStartTime + ' - ' + dayType.breakEndTime : '-';
  }
}