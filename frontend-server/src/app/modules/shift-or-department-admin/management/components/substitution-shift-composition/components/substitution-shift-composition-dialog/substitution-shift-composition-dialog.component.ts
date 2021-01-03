import { Component, Inject } from '@angular/core';
import { Employee } from "../../../../../../../model/employee";
import { Shift } from "../../../../../../../model/shift";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MainShiftComposition, SubstitutionShiftComposition } from "../../../../../../../model/main-shift-composition";
import { DATE_FORMAT, getEmployeeShortName } from "../../../../../../../shared/utils/utils";
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { MAT_DATE_FORMATS } from "@angular/material/core";

@Component({
  selector: 'app-substitution-shift-composition-dialog',
  templateUrl: './substitution-shift-composition-dialog.component.html',
  styleUrls: [
    '../../../../../../../shared/common/dialog.common.css',
    './substitution-shift-composition-dialog.component.css'],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMAT
    }
  ]
})
export class SubstitutionShiftCompositionDialogComponent extends DialogBaseComponent<SubstitutionShiftComposition> {

  employees:        Employee[];
  shifts:           Shift[];
  mainCompositions: MainShiftComposition[];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<SubstitutionShiftComposition>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.shiftSchedule, dialogRef);
    this.employees = data.employees;
    this.shifts = data.shifts;
    this.mainCompositions = data.mainCompositions;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:                   [],
      shiftId:              [null, Validators.required],
      employeeId:           [null, Validators.required],
      mainShiftComposition: [null, Validators.required],
      from:                 [null, Validators.required],
      to:                   [null, Validators.required]
    });
  }

  fillInTheForm(shiftSchedule: SubstitutionShiftComposition) {
    this.dialogForm.setValue({
      id:                   shiftSchedule.id,
      shiftId:              shiftSchedule.shiftId,
      employeeId:           shiftSchedule.employeeId,
      mainShiftComposition: shiftSchedule.mainShiftComposition,
      from:                 shiftSchedule.from,
      to:                   shiftSchedule.to,
    });
  }

  getEmployeeShortName(employee): string {
    return getEmployeeShortName(employee);
  }

  getEmployeeMainCompositions(): MainShiftComposition[] {
    let selectedEmployee = this.dialogForm.value.employee;
    if (selectedEmployee) {
      return this.mainCompositions.filter(value => value.employeeId === selectedEmployee.id);
    }
    return [];
  }

  getEmployeeAvailableShifts(): Shift[] {
    // let selectedMainShiftComposition: MainShiftComposition = this.dialogForm.value.mainShiftComposition;
    // if (selectedMainShiftComposition) {
    //   return this.shifts.filter(value => value.id !== selectedMainShiftComposition.shiftId);
    // }
    // return [];
    return this.shifts;
  }

}
