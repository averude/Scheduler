import { Component, OnInit } from '@angular/core';
import { ShiftService } from "../../../../../../../services/shift.service";
import { ScheduleService } from "../../../../../../../services/schedule.service";
import { ShiftGenerationUnit, toScheduleGenerationDto } from "../../../../../../../model/ui/shift-generation-unit";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ScheduleGenerationDialogComponent } from "../schedule-generation-dialog/schedule-generation-dialog.component";
import * as moment from "moment";
import { ScheduleGeneratedService } from "../schedule-generated.service";
import { NotificationsService } from "angular2-notifications";
import { from } from "rxjs";
import { concatMap } from "rxjs/operators";

@Component({
  selector: 'app-schedule-generation',
  templateUrl: './schedule-generation.component.html',
  styleUrls: ['./schedule-generation.component.css']
})
export class ScheduleGenerationComponent implements OnInit {

  units: ShiftGenerationUnit[] = [];

  constructor(private dialog: MatDialog,
              private shiftService: ShiftService,
              private scheduleService: ScheduleService,
              private notificationsService: NotificationsService,
              private scheduleGeneratedService: ScheduleGeneratedService) {
  }

  ngOnInit() {
    this.shiftService.getAll()
      .subscribe(shifts => {
        const data: ShiftGenerationUnit[] = [];
        shifts.forEach(shift => data.push({
          shift: shift,
          offset: 0,
          from: moment.utc().startOf("year"),
          to: moment.utc().endOf("year")
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
      .subscribe(this.onDialogClosed);
  }

  get onDialogClosed(): (selected: ShiftGenerationUnit[]) => void {
    return (selected: ShiftGenerationUnit[]) => {
      if (selected && selected.length > 0) {

        let dtos = selected.map(unit => toScheduleGenerationDto(unit));

        from(dtos).pipe(
          concatMap(generationDto => this.scheduleService.generate(generationDto))
        ).subscribe(res => this.notificationsService.success('Generated', res));
      }
    }
  }
}
