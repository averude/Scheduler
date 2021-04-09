import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DepartmentDayType } from "../../../../model/department-day-type";
import { DayType } from "../../../../model/day-type";
import { ShiftPatternDTO } from "../../../../model/dto/shift-pattern-dto";
import { ShiftPattern } from "../../../../model/shift-pattern";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { HasOrder, PatternUnit } from "../../../../model/pattern-unit";
import { ShiftPatternGenerationRule } from "../../../../model/shift-pattern-generation-rule";

@Component({
  selector: 'app-shift-pattern-dialog',
  templateUrl: './shift-pattern-dialog.component.html',
  styleUrls: ['./shift-pattern-dialog.component.css']
})
export class ShiftPatternDialogComponent implements OnInit {

  private readonly departmentId: number;

  shiftPatternDTO:    ShiftPatternDTO;

  dayTypes:           DayType[];
  departmentDayTypes: DepartmentDayType[];

  constructor(private dialogRef: MatDialogRef<ShiftPatternDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.departmentId       = data.departmentId;
    this.shiftPatternDTO    = data.dto || this.createShiftPatternDTO();
    this.dayTypes           = data.dayTypes || [];
    this.departmentDayTypes = data.departmentDayTypes || [];
  }

  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<HasOrder[]>, sequence: HasOrder[]) {
    const previousIndex = event.previousIndex;
    const currentIndex  = event.currentIndex;
    if (currentIndex === previousIndex) {
      return;
    }

    const element = sequence[previousIndex];
    sequence.splice(previousIndex, 1);
    sequence.splice(currentIndex, 0, element);

    sequence.forEach((value, index) => {
      value.orderId = index + 1;
    });
  }

  addPatternUnit() {
    const unit = new PatternUnit();
    unit.orderId = this.getLastOrderId(this.shiftPatternDTO.collection) + 1;
    this.shiftPatternDTO.collection.push(unit);
  }

  addPatternRule() {
    const rule = new ShiftPatternGenerationRule();
    rule.orderId = this.getLastOrderId(this.shiftPatternDTO.generationRules) + 1;
    this.shiftPatternDTO.generationRules.push(rule);
  }

  private createShiftPatternDTO() {
    const shiftPatternDTO = new ShiftPatternDTO();
    shiftPatternDTO.parent = new ShiftPattern();
    shiftPatternDTO.parent.departmentId = this.departmentId;
    shiftPatternDTO.collection = [];
    shiftPatternDTO.generationRules = [];
    return shiftPatternDTO;
  }

  private getLastOrderId(sequence: HasOrder[]): number {
    if (sequence.length > 0) {
      return sequence
        .sort((a, b) => a.orderId - b.orderId)[sequence.length - 1]
        .orderId;
    } else {
      return 0;
    }
  }

  delete(child: any, sequence: any) {
    const index = sequence.findIndex(value => value === child);
    sequence.splice(index, 1);
    this.afterDelete(index, sequence);
  }

  afterDelete(index: number, collection: HasOrder[]): void {
    for (let i = index; i < collection.length; i++) {
      collection[i].orderId--;
    }
  }

  submit() {
    this.dialogRef.close(this.shiftPatternDTO);
  }
}
