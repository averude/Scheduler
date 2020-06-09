import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PatternUnit } from "../../../../../../../model/pattern-unit";
import { ShiftPattern } from "../../../../../../../model/shift-pattern";
import { AuthService } from "../../../../../../../http-services/auth.service";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { DepartmentDayType } from "../../../../../../../model/department-day-type";
import { DtoDialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dto-dialog-base.component";

@Component({
  selector: 'app-pattern-dialog',
  templateUrl: './pattern-dialog.component.html',
  styleUrls: ['./pattern-dialog.component.css']
})
export class PatternDialogComponent extends DtoDialogBaseComponent<ShiftPattern, PatternUnit> {

  operation: string;

  departmentDayTypes: DepartmentDayType[];

  constructor(private authService: AuthService,
              dialogRef: MatDialogRef<PatternDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);
    this.departmentDayTypes = data.departmentDayTypes ? data.departmentDayTypes : [];
  }

  configureChild(child: PatternUnit): void {
    child.orderId = this.lastOrderId + 1;
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

  afterDelete(index: number, collection: PatternUnit[]): void {
    for (let i = index; i < collection.length; i++) {
      collection[i].orderId--;
    }
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
}
