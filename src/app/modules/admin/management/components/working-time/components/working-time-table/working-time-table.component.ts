import { Component } from '@angular/core';
import { WorkingTime } from "../../../../../../../model/working-time";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { WorkingTimeService } from "../../../../../../../services/working-time.service";
import { ShiftService } from "../../../../../../../services/shift.service";
import { Shift } from "../../../../../../../model/shift";
import { WorkingTimeDialogComponent } from "../working-time-dialog/working-time-dialog.component";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { PageableTableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/pageable-table-base.component";

@Component({
  selector: 'app-working-time-table',
  templateUrl: './working-time-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css',
    './working-time-table.component.css'],
  providers: [PaginatorService]
})
export class WorkingTimeTableComponent extends PageableTableBaseComponent<WorkingTime> {
  displayedColumns = ['select', 'year', 'month', 'shift', 'hours', 'control'];

  shifts: Shift[] = [];

  constructor(paginatorService: PaginatorService,
              dialog: MatDialog,
              notificationsService: NotificationsService,
              workingTimeService: WorkingTimeService,
              private shiftService: ShiftService) {
    super(paginatorService, dialog, workingTimeService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);
  }

  openDialog(workingTime: WorkingTime) {
    const data = {
      workingTime:  workingTime,
      shifts:       this.shifts
    };

    this.openAddOrEditDialog(workingTime, data, WorkingTimeDialogComponent);
  }

  getShiftName(shiftId: number): string {
    let shift = this.shifts.find(value => value.id === shiftId);
    if (shift) {
      return shift.name;
    } else {
      return '-';
    }
  }
}
