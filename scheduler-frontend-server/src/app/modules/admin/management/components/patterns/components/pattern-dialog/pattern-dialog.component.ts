import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PatternUnit } from "../../../../../../../model/pattern-unit";
import { ShiftPattern } from "../../../../../../../model/shift-pattern";
import { AuthService } from "../../../../../../../http-services/auth.service";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { DepartmentDayType } from "../../../../../../../model/department-day-type";
import { IdEntity } from "../../../../../../../model/interface/id-entity";
import { ShiftPatternDto } from "../../../../../../../model/dto/basic-dto";

@Component({
  selector: 'app-pattern-dialog',
  templateUrl: './pattern-dialog.component.html',
  styleUrls: ['./pattern-dialog.component.css']
})
export class PatternDialogComponent implements OnInit {

  operation: string;

  dto: ShiftPatternDto;
  departmentDayTypes: DepartmentDayType[];

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<PatternDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.dto = data.dto ? data.dto : this.newDto;
    this.departmentDayTypes = data.departmentDayTypes ? data.departmentDayTypes : [];
  }

  ngOnInit() {
    this.operation = this.dto ? 'Edit' : 'Add';
  }

  addUnit() {
    const newUnit = new PatternUnit();
    newUnit.patternId = this.dto.entity.id;
    newUnit.orderId   = this.lastOrderId + 1;
    this.dto.collection.push(newUnit);
  }

  drop(event: CdkDragDrop<PatternUnit[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex  = event.currentIndex;
    if (currentIndex === previousIndex) {
      return;
    }

    const sequence = this.dto.collection;
    const element = sequence[previousIndex];
    sequence.splice(previousIndex, 1);
    sequence.splice(currentIndex, 0, element);

    sequence.forEach((value, index) => {
      value.orderId = index + 1;
    });
  }

  delete(unit: PatternUnit) {
    const sequence = this.dto.collection;
    const index = sequence.findIndex(value => value === unit);
    sequence.splice(index, 1);
    for (let i = index; i < sequence.length; i++) {
      sequence[i].orderId--;
    }
  }

  compare(a: number, b: number): boolean {
    return a === b;
  }

  compareIdEntity(a: IdEntity, b: IdEntity): boolean {
    return (a && b) && (a.id === b.id);
  }

  private get lastOrderId(): number {
    let sequence = this.dto.collection;
    if (sequence.length > 0) {
      return sequence
        .sort((a, b) => a.orderId - b.orderId)[sequence.length - 1]
        .orderId;
    } else {
      return 0;
    }
  }

  private get newDto(): ShiftPatternDto {
    const dto = new ShiftPatternDto();
    dto.entity = new ShiftPattern();
    dto.entity.departmentId = this.authService.departmentId;
    dto.entity.name = '';
    dto.collection = [];
    return dto;
  }

  submit() {
    this.dialogRef.close(this.dto);
  }

  close() {
    this.dialogRef.close();
  }
}
