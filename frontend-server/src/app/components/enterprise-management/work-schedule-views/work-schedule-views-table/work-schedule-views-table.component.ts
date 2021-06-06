import { Component } from '@angular/core';
import { HasEnterpriseTableComponent } from "../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { WorkScheduleView } from "../../../../model/work-schedule-view";
import { BasicDTO } from "../../../../model/dto/basic-dto";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../../../services/http/auth.service";
import { NotificationsService } from "angular2-notifications";
import { DayTypeService } from "../../../../services/http/day-type.service";
import { ActivatedRoute } from "@angular/router";
import { WorkScheduleViewDTOService } from "../../../../services/http/work-schedule-view-dto.service";
import { DayType } from "../../../../model/day-type";
import { Department } from "../../../../model/department";
import { DepartmentService } from "../../../../services/http/department.service";
import { WorkScheduleViewsDialogComponent } from "../work-schedule-views-dialog/work-schedule-views-dialog.component";

@Component({
  selector: 'app-work-schedule-views-table',
  templateUrl: './work-schedule-views-table.component.html',
  styleUrls: ['../../../../shared/common/table.common.css',
    './work-schedule-views-table.component.css']
})
export class WorkScheduleViewsTableComponent extends HasEnterpriseTableComponent<BasicDTO<WorkScheduleView, number>> {

  displayedColumns = ['select', 'name', 'targetDepartmentId', 'departmentId', 'dayTypeIds', 'control'];

  dayTypes: DayType[];
  departments: Department[];

  depMap: Map<number, Department>;
  dayTypeMap: Map<number, DayType>;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private dayTypeService: DayTypeService,
              private departmentService: DepartmentService,
              private workScheduleViewService: WorkScheduleViewDTOService,
              private activatedRoute: ActivatedRoute) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.enterpriseId),
      workScheduleViewService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();

    const enterpriseId = this.authService.currentUserAccount.enterpriseId;

    this.dayTypeService.getAllByEnterpriseId(enterpriseId)
      .subscribe(dayTypes => {
        this.dayTypes = dayTypes;

        this.dayTypeMap = new Map<number, DayType>();
        dayTypes.forEach(dayType => this.dayTypeMap.set(dayType.id, dayType));
      });

    this.departmentService.getAllByEnterpriseId(enterpriseId)
      .subscribe(departments => {
        this.departments = departments;

        this.depMap = new Map<number, Department>();
        departments.forEach(department => this.depMap.set(department.id, department));
      });
  }

  openDialog(dto: BasicDTO<WorkScheduleView, number>) {

    const data = {
      dto:          dto,
      enterpriseId: this.enterpriseId,
      departments:  this.departments,
      dayTypes:     this.dayTypes
    };

    this.openAddOrEditDialog(dto, data, WorkScheduleViewsDialogComponent);
  }

  getDayTypesNames(ids: number[]): string {
    return ids
      .map(id => this.dayTypeMap.get(id)?.name)
      .reduce((previousValue, currentValue) => previousValue += (', ' + currentValue));
  }

}
