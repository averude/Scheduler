import { Component } from '@angular/core';
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { PatternDialogComponent } from "../pattern-dialog/pattern-dialog.component";
import { DepartmentDayType } from "../../../../../../../model/department-day-type";
import { DepartmentDayTypeService } from "../../../../../../../services/http/department-day-type.service";
import { ShiftPatternDtoService } from "../../../../../../../services/http/shift-pattern-dto.service";
import { BasicDto } from "../../../../../../../model/dto/basic-dto";
import { ShiftPattern } from "../../../../../../../model/shift-pattern";
import { PatternUnit } from "../../../../../../../model/pattern-unit";

@Component({
  selector: 'app-patterns-table',
  templateUrl: './patterns-table.component.html',
  styleUrls: [
    '../../../../../../../shared/common/table.common.css',
    './patterns-table.component.css'
  ]
})
export class PatternsTableComponent extends TableBaseComponent<BasicDto<ShiftPattern, PatternUnit>> {

  displayedColumns = ['select', 'name', 'onExtraWeekend', 'onHoliday', 'onExtraWorkDay', 'pattern', 'control'];

  departmentDayTypes: DepartmentDayType[];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private departmentDayTypeService: DepartmentDayTypeService,
              private shiftPatternDtoService: ShiftPatternDtoService) {
    super(dialog, shiftPatternDtoService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.departmentDayTypeService.getAll()
      .subscribe(departmentDayTypes => this.departmentDayTypes = departmentDayTypes);
  }

  openDialog(dto: BasicDto<ShiftPattern, PatternUnit>) {
    const data = {
      dto:  dto,
      departmentDayTypes: this.departmentDayTypes.filter(depDayType => !depDayType.dayType.usePreviousValue)
    };

    this.openAddOrEditDialog(dto, data, PatternDialogComponent);
  }

  onCreated(value: BasicDto<ShiftPattern, PatternUnit>): (response: BasicDto<ShiftPattern, PatternUnit>) => void {
    return res => {
      this.addRow(res);
      this.notificationsService
        .success(
          'Created',
          `Entity was successfully created`)
    }
  }

  onUpdated(value: BasicDto<ShiftPattern, PatternUnit>,
            oldValue: BasicDto<ShiftPattern, PatternUnit>): (response: BasicDto<ShiftPattern, PatternUnit>) => void {
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
