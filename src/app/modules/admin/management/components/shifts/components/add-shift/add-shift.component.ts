import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shift } from '../../../../../../../model/shift';
import { ShiftPattern } from '../../../../../../../model/shiftpattern';

@Component({
  selector: '[app-add-shift]',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})
export class AddShiftComponent implements OnInit {
  @Input() patterns: ShiftPattern[];
  newShift: Shift = new Shift();
  @Output()
  shiftCreated: EventEmitter<Shift> = new EventEmitter<Shift>();

  constructor() { }

  ngOnInit() {
  }

  addShift() {
    this.newShift.departmentId = 1; // temporary
    this.shiftCreated.emit(this.newShift);
    this.clearModel();
  }

  clearModel() {
    this.newShift = new Shift();
  }
}
