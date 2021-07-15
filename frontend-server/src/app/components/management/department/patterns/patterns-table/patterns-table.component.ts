import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { ShiftPatternDialogComponent } from "../shift-pattern-dialog/shift-pattern-dialog.component";
import { ActivatedRoute } from "@angular/router";
import { HasDepartmentTableComponent } from "../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { ShiftPatternDTO } from "../../../../../model/dto/shift-pattern-dto";
import { DayType } from "../../../../../model/day-type";
import { DepartmentDayType } from "../../../../../model/department-day-type";
import { AuthService } from "../../../../../services/http/auth.service";
import { DayTypeService } from "../../../../../services/http/day-type.service";
import { DepartmentDayTypeService } from "../../../../../services/http/department-day-type.service";
import { ShiftPatternDtoService } from "../../../../../services/http/shift-pattern-dto.service";

@Component({
  selector: 'app-patterns-table',
  templateUrl: './patterns-table.component.html',
  styleUrls: [
    '../../../../../shared/common/table.common.css',
    './patterns-table.component.css'
  ]
})
export class PatternsTableComponent extends HasDepartmentTableComponent<ShiftPatternDTO> {

  displayedColumns = ['select', 'name', 'control'];

  dayTypes: DayType[];
  departmentDayTypes: DepartmentDayType[];

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private dayTypeService: DayTypeService,
              private departmentDayTypeService: DepartmentDayTypeService,
              private shiftPatternDtoService: ShiftPatternDtoService,
              private activatedRoute: ActivatedRoute) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.departmentId),
      shiftPatternDtoService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();

    const enterpriseId = this.authService.currentUserAccount.enterpriseId;

    this.dayTypeService.getAllByEnterpriseId(enterpriseId)
      .subscribe(dayTypes => this.dayTypes = dayTypes);

    this.departmentDayTypeService.getAllByDepartmentId(this.departmentId)
      .subscribe(departmentDayTypes => this.departmentDayTypes = departmentDayTypes);
  }

  openDialog(dto: ShiftPatternDTO) {
    const data = {
      dto:  dto,
      departmentId: this.departmentId,
      dayTypes: this.dayTypes,
      departmentDayTypes: this.departmentDayTypes.filter(depDayType => !depDayType.dayType.usePreviousValue)
    };

    this.openAddOrEditDialog(dto, data, ShiftPatternDialogComponent, (value => !!value.parent.id));
  }

  onCreated(value: ShiftPatternDTO): (response: ShiftPatternDTO) => void {
    return res => {
      this.addRow(res);
      this.notificationsService
        .success(
          'Created',
          `Entity was successfully created`)
    }
  }

  onUpdated(value: ShiftPatternDTO,
            oldValue: ShiftPatternDTO): (response: ShiftPatternDTO) => void {
    return res => {
      this.updateRow(res, oldValue);
      this.notificationsService
        .success(
          'Updated',
          `Entity was successfully updated`);
    }
  }

  removeSelected() {
    this.selection.selected.forEach(value =>
      this.shiftPatternDtoService.delete(value.parent.id)
        .subscribe(res => {
          this.removeRow(value);
          this.notificationsService.success(
            'Deleted',
            'Selected values was successfully deleted'
          );
        }));
  }
}
