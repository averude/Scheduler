import { Component, OnInit } from '@angular/core';
import { ShiftService } from "../../../../../../../services/shift.service";
import { ScheduleService } from "../../../../../../../services/schedule.service";
import { ShiftGenerationUnit } from "../../../../../../../model/ui/shift-generation-unit";
import { dateToISOString } from "../../../../../../../shared/utils/utils";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ScheduleGenerationDialogComponent } from "../schedule-generation-dialog/schedule-generation-dialog.component";

@Component({
  selector: 'app-schedule-generation',
  templateUrl: './schedule-generation.component.html',
  styleUrls: ['./schedule-generation.component.css']
})
export class ScheduleGenerationComponent implements OnInit {

  units: ShiftGenerationUnit[] = [];

  constructor(private dialog: MatDialog,
              private shiftService: ShiftService,
              private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.shiftService.getAll()
      .subscribe(shifts => {
        const data: ShiftGenerationUnit[] = [];
        shifts.forEach(shift => data.push({
          shiftId: shift.id,
          shiftName: shift.name,
          offset: 0,
          from: new Date(new Date().getUTCFullYear(), 0, 1),
          to: new Date(new Date().getUTCFullYear(), 11, 31)
        }));
        this.units = data;
      });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.units;

    this.dialog.open(ScheduleGenerationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(selected => {
        if (selected && selected.lenght > 0) {
          selected.forEach(unit => this.scheduleService
            .generate(unit.shiftId, dateToISOString(unit.from), dateToISOString(unit.to), unit.offset)
            .subscribe(res => console.log(res)));
        }
      });
  }

}
