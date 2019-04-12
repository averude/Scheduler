import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DayType } from "../../../../../../../model/daytype";
import { PatternUnit } from "../../../../../../../model/patternunit";
import { ShiftPattern } from "../../../../../../../model/shiftpattern";
import { AuthService } from "../../../../../../../services/auth.service";

@Component({
  selector: 'app-pattern-dialog',
  templateUrl: './pattern-dialog.component.html',
  styleUrls: ['./pattern-dialog.component.css']
})
export class PatternDialogComponent implements OnInit {

  operation: string;

  pattern: ShiftPattern;
  units: PatternUnit[];
  dayTypes: DayType[];

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<PatternDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.pattern = data.pattern ? data.pattern : this.newShiftPattern;
    this.units = data.units ? data.units : [];
    this.dayTypes = data.dayTypes ? data.dayTypes : [];
  }

  ngOnInit() {
    this.operation = this.pattern ? 'Edit' : 'Add';
  }

  addUnit() {
    const newUnit = new PatternUnit();
    newUnit.patternId = this.pattern.id;
    newUnit.orderId = this.lastOrderId + 1;
    this.units.push(newUnit);
  }

  moveUp(unit: PatternUnit) {
    const orderNumber = unit.orderId;
    if (orderNumber > 1) {
      this.swapUnits(unit, orderNumber - 1);
    }
  }

  moveDown(unit: PatternUnit) {
    const size = this.units.length;
    const orderNumber = unit.orderId;
    if (size > orderNumber && orderNumber !== 0) {
      this.swapUnits(unit, orderNumber + 1);
    }
  }

  delete(unit: PatternUnit) {
    const index = this.units.findIndex(value => value === unit);
    this.units.splice(index, 1);
    for (let i = index; i < this.units.length; i++) {
      this.units[i].orderId--;
    }
  }

  private swapUnits(fromUnit: PatternUnit, to: number) {
    const fromNum = fromUnit.orderId;
    const toUnit = this.units.find(value => value.orderId === to);
    fromUnit.orderId = to;
    toUnit.orderId = fromNum;
    this.units.sort((a,b) => a.orderId - b.orderId);
  }

  private get lastOrderId(): number {
    if (this.units.length > 0) {
      return this.units
        .sort((a, b) => a.orderId - b.orderId)[this.units.length - 1]
        .orderId;
    } else {
      return 0;
    }
  }

  private get newShiftPattern(): ShiftPattern {
    const pattern = new ShiftPattern();
    pattern.departmentId = this.authService.currentUserValue.departmentId;
    pattern.name = '';
    return pattern;
  }

  submit() {
    this.dialogRef.close({pattern: this.pattern, units: this.units});
  }

  close() {
    this.dialogRef.close();
  }
}

export interface ShiftPatternWrapper {
  pattern: ShiftPattern;
  units: PatternUnit[];
}
