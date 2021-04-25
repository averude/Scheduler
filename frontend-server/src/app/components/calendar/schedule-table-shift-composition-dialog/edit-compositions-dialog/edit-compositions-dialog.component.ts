import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Composition, equals } from "../../../../model/composition";
import { Position } from "../../../../model/position";
import { FormArray, FormBuilder } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { DATE_FORMAT } from "../../../../shared/utils/utils";

@Component({
  selector: 'app-edit-compositions-dialog',
  templateUrl: './edit-compositions-dialog.component.html',
  styleUrls: ['./edit-compositions-dialog.component.css'],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMAT
    }
  ]
})
export class EditCompositionsDialogComponent implements OnInit {

  employeeName: string;
  compositions: Composition[];
  positions:    Position[];

  removedCompositions: Composition[] = [];

  compositionForms: FormArray;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<Composition>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.compositionForms = this.fb.array([]);
    this.compositions = data.compositions;
    this.employeeName = data.employeeName;
    this.positions    = data.initData.positions;
  }

  ngOnInit(): void {
    this.compositions.forEach(composition => this.addComposition(composition));
  }

  addComposition(composition: Composition) {
    this.compositionForms.push(this.fb.group({
      id:         [composition.id],
      shiftId:    [composition.shiftId],
      employeeId: [composition.employeeId],
      positionId: [composition.positionId],
      from:       [composition.from],
      to:         [composition.to]
    }));
  }

  removeComposition(index: number) {
    const removedComposition = this.compositionForms.at(index).value;
    this.removedCompositions.push(removedComposition);
    this.compositionForms.removeAt(index);

    this.remove();
  }

  removeAll() {
    this.compositionForms
      .controls
      .forEach(control => this.removedCompositions.push(control.value));

    this.remove();
  }

  private remove() {
    if (this.removedCompositions.length > 0) {
      this.dialogRef.close({
        command: 'delete',
        data: this.removedCompositions
      });
    }
  }

  save() {
    const changedCompositions = this.getChangedCompositions();

    if (changedCompositions.length > 0) {
      this.dialogRef.close({
        command: 'save',
        data: changedCompositions
      });
    }
  }

  getChangedCompositions() {
    const compositions = this.compositionForms.controls.map(control => control.value);

    let changedCompositions = [];

    for (let i = 0; i < compositions.length; i++) {
      const composition = compositions[i];
      const oldComposition = this.compositions.find(value => value.id === composition.id);

      if (oldComposition) {
        if (!equals(composition, oldComposition)) {
          let newObject:any = {};
          Object.assign(newObject, oldComposition);
          newObject.from = composition.from;
          newObject.to = composition.to;
          newObject.positionId = composition.positionId;
          changedCompositions.push(newObject);
        }
      }
    }

    return changedCompositions;
  }
}
