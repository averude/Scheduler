import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../../../../../../services/shift.service';
import { Shift } from '../../../../../../../model/shift';
import { ShiftPattern } from '../../../../../../../model/shiftpattern';
import { ShiftPatternService } from '../../../../../../../services/shiftpattern.service';
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  styleUrls: ['./shifts-table.component.css']
})
export class ShiftsTableComponent implements OnInit {

  shifts: Shift[];
  patterns: ShiftPattern[];

  constructor(private shiftService: ShiftService,
              private notificationService: NotificationsService,
              private patternService: ShiftPatternService) { }

  ngOnInit() {
    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);
    this.patternService.getAll()
      .subscribe(patterns => this.patterns = patterns);
  }

  addShift(shift: Shift) {
    this.shiftService.create(shift)
      .subscribe(res => {
        shift.id = res;
        this.shifts.push(shift);
        this.notificationService.success(
          'Created',
          `Shift "${shift.name}" was successfully created`
        );
      });
  }

  updateShift(shift: Shift) {
    this.shiftService.update(shift)
      .subscribe(res => this.notificationService.success(
        'Updated',
        `Shift "${shift.name}" was successfully updated`
      ));
  }

  deleteShift(shift: Shift) {
    this.shiftService.remove(shift.id)
      .subscribe(res => {
        this.shifts = this.shifts
          .filter(value => value !== shift);
        this.notificationService.success(
          'Deleted',
          `Shift "${shift.name}" was successfully deleted`
        );
      });
  }
}
