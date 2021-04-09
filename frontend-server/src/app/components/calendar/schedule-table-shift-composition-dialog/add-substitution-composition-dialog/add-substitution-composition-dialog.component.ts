import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Shift } from "../../../../model/shift";
import { Position } from "../../../../model/position";
import { Employee } from "../../../../model/employee";
import { MainComposition } from "../../../../model/composition";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { DATE_FORMAT } from "../../../../shared/utils/utils";

@Component({
  selector: 'app-add-substitution-composition-dialog',
  templateUrl: './add-substitution-composition-dialog.component.html',
  styleUrls: ['./add-substitution-composition-dialog.component.css'],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMAT
    }
  ]
})
export class AddSubstitutionCompositionDialogComponent implements OnInit {

  from:       any;
  to:         any;
  shifts:     Shift[];
  positions:  Position[];
  employee:   Employee;

  mainComposition: MainComposition;

  substitutionCompositionForm: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.from       = data.from;
    this.to         = data.to;
    this.shifts     = data.shifts;
    this.positions  = data.positions;
    this.employee   = data.employee;

    this.mainComposition = data.mainComposition;
  }

  ngOnInit(): void {
    this.substitutionCompositionForm = this.fb.group({
      departmentId:         [this.employee.departmentId],
      shiftId:              [null,                      Validators.required],
      mainComposition:      [this.mainComposition, Validators.required],
      employeeId:           [this.employee.id,          Validators.required],
      positionId:           [this.mainComposition.positionId, Validators.required],
      from:                 [this.from,                 Validators.required],
      to:                   [this.to,                   Validators.required]
    });
  }

  save() {
    this.dialogRef.close(this.substitutionCompositionForm.value);
  }

}
