import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../../../../../../services/shift.service';
import { Shift } from '../../../../../../../model/shift';
import { ShiftPattern } from '../../../../../../../model/shiftpattern';
import { ShiftPatternService } from '../../../../../../../services/shiftpattern.service';

@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  styleUrls: ['./shifts-table.component.css']
})
export class ShiftsTableComponent implements OnInit {

  private departmentId = 1;

  shifts: Shift[];
  patterns: ShiftPattern[];

  constructor(private shiftService: ShiftService,
              private patternService: ShiftPatternService) { }

  ngOnInit() {
    this.shiftService.getByDepartmentId(this.departmentId)
      .subscribe(shifts => this.shifts = shifts);
    this.patternService.getByDepartmentId(this.departmentId)
      .subscribe(patterns => this.patterns = patterns);
  }

  addShift(shift: Shift) {
    this.shiftService.create(this.departmentId, shift)
      .subscribe(res => {
        shift.id = res;
        this.shifts.push(shift);
      });
  }

  updateShift(shift: Shift) {
    this.shiftService.update(this.departmentId, shift)
      .subscribe(res => console.log(res));
  }

  deleteShift(shift: Shift) {
    this.shiftService.remove(this.departmentId, shift.id)
      .subscribe(res =>
          this.shifts = this.shifts
            .filter(value => value !== shift));
  }
}
