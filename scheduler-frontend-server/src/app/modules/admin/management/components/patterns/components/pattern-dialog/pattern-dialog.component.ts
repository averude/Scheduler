import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DayType } from "../../../../../../../model/day-type";
import { PatternUnit } from "../../../../../../../model/pattern-unit";
import { ShiftPattern } from "../../../../../../../model/shift-pattern";
import { AuthService } from "../../../../../../../http-services/auth.service";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";

@Component({
  selector: 'app-pattern-dialog',
  templateUrl: './pattern-dialog.component.html',
  styleUrls: ['./pattern-dialog.component.css']
})
export class PatternDialogComponent implements OnInit {

  operation: string;

  pattern:        ShiftPattern;
  units:          PatternUnit[];
  dayTypes:       DayType[];
  dayTypeGroups:  DayTypeGroup[];

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<PatternDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.pattern        = data.pattern ? data.pattern : this.newShiftPattern;
    this.units          = data.units ? data.units : [];
    this.dayTypes       = data.dayTypes ? data.dayTypes : [];
    this.dayTypeGroups  = data.dayTypeGroups ? data.dayTypeGroups : [];
  }

  ngOnInit() {
    this.operation = this.pattern ? 'Edit' : 'Add';
  }

  addUnit() {
    const newUnit = new PatternUnit();
    newUnit.patternId = this.pattern.id;
    newUnit.orderId   = this.lastOrderId + 1;
    this.units.push(newUnit);
  }

  drop(event: CdkDragDrop<PatternUnit[]>) {
    let previousIndex = event.previousIndex;
    let currentIndex  = event.currentIndex;
    if (currentIndex === previousIndex) {
      return;
    }
    let element = this.units[previousIndex];
    this.units.splice(previousIndex, 1);
    this.units.splice(currentIndex, 0, element);

    this.units.forEach((value, index) => {
      value.orderId = index + 1;
    });
  }

  delete(unit: PatternUnit) {
    const index = this.units.findIndex(value => value === unit);
    this.units.splice(index, 1);
    for (let i = index; i < this.units.length; i++) {
      this.units[i].orderId--;
    }
  }

  compare(a: number, b: number): boolean {
    return a === b;
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
    pattern.departmentId = this.authService.departmentId;
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
