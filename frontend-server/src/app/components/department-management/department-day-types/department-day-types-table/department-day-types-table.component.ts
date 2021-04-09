import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { DayType } from "../../../../model/day-type";
import { HasDepartmentTableComponent } from "../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { DepartmentDayType } from "../../../../model/department-day-type";
import { DepartmentDayTypeService } from "../../../../services/http/department-day-type.service";
import { DepartmentDayTypeDialogComponent } from "../department-day-type-dialog/department-day-type-dialog.component";
import { DayTypeService } from "../../../../services/http/day-type.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../../services/http/auth.service";

@Component({
  selector: 'app-department-day-types-table',
  templateUrl: './department-day-types-table.component.html',
  styleUrls: ['../../../../shared/common/table.common.css','./department-day-types-table.component.css']
})
export class DepartmentDayTypesTableComponent extends HasDepartmentTableComponent<DepartmentDayType> {

  dayTypes: DayType[] = [];

  displayedColumns = ['select', 'name', 'parent_name', 'label', 'work_time', 'break_time', 'control'];

  constructor(dialog: MatDialog,
              private authService: AuthService,
              private departmentDayTypeService: DepartmentDayTypeService,
              notificationsService: NotificationsService,
              private dayTypeService: DayTypeService,
              private activatedRoute: ActivatedRoute) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.departmentId),
      departmentDayTypeService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();

    const enterpriseId = this.authService.currentUserAccount.enterpriseId;

    this.dayTypeService.getAllByEnterpriseId(enterpriseId)
      .subscribe(dayTypes => this.dayTypes = dayTypes
        .filter(dayType => !dayType.usePreviousValue));
  }

  openDialog(departmentDayType: DepartmentDayType) {
    const data = {
      departmentDayType:  departmentDayType,
      dayTypes:           this.dayTypes
    };

    this.openAddOrEditDialog(departmentDayType, data, DepartmentDayTypeDialogComponent);
  }

  getWorkTimeString(dayType: DepartmentDayType): string {
    return dayType.startTime && dayType.endTime ? dayType.startTime + ' - ' + dayType.endTime : '-';
  }

  getBreakTimeString(dayType: DepartmentDayType): string {
    return dayType.breakStartTime && dayType.breakEndTime ? dayType.breakStartTime + ' - ' + dayType.breakEndTime : '-';
  }
}
