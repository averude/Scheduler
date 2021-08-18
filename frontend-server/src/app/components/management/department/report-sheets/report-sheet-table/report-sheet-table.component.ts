import { Component } from '@angular/core';
import { HasDepartmentTableComponent } from "../../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { ReportSheetDTO } from "../../../../../model/dto/report-sheet-dto";
import { MatDialog } from "@angular/material/dialog";
import { ReportSheetDTOService } from "../../../../../services/http/report-sheet-dto.service";
import { NotificationsService } from "angular2-notifications";
import { Shift } from "../../../../../model/shift";
import { ReportSheetDialogComponent } from "../report-sheet-dialog/report-sheet-dialog.component";
import { ShiftService } from "../../../../../services/http/shift.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-report-sheet-table',
  templateUrl: './report-sheet-table.component.html',
  styleUrls: ['../../../../../shared/common/table.common.css','./report-sheet-table.component.css']
})
export class ReportSheetTableComponent extends HasDepartmentTableComponent<ReportSheetDTO> {

  displayedColumns = ['select', 'name', 'shifts', 'control'];

  shifts: Shift[] = [];
  shiftMap: Map<number, Shift>;

  constructor(matDialog: MatDialog,
              private reportSheetDTOService: ReportSheetDTOService,
              notification: NotificationsService,
              private shiftService: ShiftService,
              private activatedRoute: ActivatedRoute) {
    super(matDialog, Number.parseInt(activatedRoute.parent.snapshot.params.departmentId),
      reportSheetDTOService, notification);

    this.shiftService.getAllByDepartmentId(this.departmentId)
      .subscribe(shifts => {
        this.shiftMap = new Map<number, Shift>();
        shifts.forEach(shift => this.shiftMap.set(shift.id, shift));

        this.shifts = shifts.sort((a,b) => a.id - b.id);
      });
  }

  openDialog(dto: ReportSheetDTO) {
    const data = {
      dto: dto,
      shifts: this.shifts
    };

    this.openAddOrEditDialog(dto, data, ReportSheetDialogComponent, (value => value.reportSheet.id));
  }


  onCreated(value: ReportSheetDTO): (value: any) => void {
    return res => {
      this.addRow(res);
      this.notification
        .success(
          'Created',
          `Entity was successfully created`)
    }
  }

  removeEntity(entity: ReportSheetDTO): void {
    this.reportSheetDTOService.delete(entity.reportSheet.id)
      .subscribe(res => {
        this.removeRow(entity);
        this.notification.success(
          'Deleted',
          'Selected values was successfully deleted'
        );
      });
  }

  getShiftsName(shiftIds: number[]): string {
    if (this.shifts && shiftIds && shiftIds.length > 0) {
      return shiftIds.sort()
        .map((shiftId, index) => {
          const shift = this.getShift(shiftId);
          if (shift) {
            return `${shift.name}${index < shiftIds.length - 1 ? ', ' : ''}`
          }
        })
        .reduce(((previousValue, currentValue) => previousValue.concat(currentValue)));
    }
  }

  getShift(shiftId: number): Shift {
    return this.shiftMap.get(shiftId);
  }
}
