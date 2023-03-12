import { Component, Inject, ViewChild } from '@angular/core';
import { DATE_FORMAT, getEmployeeFullName, getEmployeeShortName } from "../../../../shared/utils/utils";
import { Employee } from "../../../../model/employee";
import { Position } from "../../../../model/position";
import { DialogBaseComponent } from "../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { MainComposition } from "../../../../model/composition";
import { AbstractControl, FormArray, FormBuilder, Validators } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { Shift } from "../../../../model/shift";
import * as moment from 'moment';
import { SidePanelStepperComponent } from "../../../../lib/side-panel-stepper/side-panel-stepper.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { CalendarInitData } from "../../model/calendar-init-data";

@Component({
  selector: 'app-add-main-composition-dialog',
  templateUrl: './add-main-composition-dialog.component.html',
  styleUrls: ['./add-main-composition-dialog.component.css'],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMAT
    }
  ]
})
export class AddMainCompositionDialogComponent extends DialogBaseComponent<MainComposition> {

  secondaryForm: AbstractControl;
  secondaryFormOperation: 'add' | 'edit';

  shift:      Shift;
  employees:  Employee[];
  positions:  Position[];

  calendarDays: CalendarDay[] = [];

  hoveredIndex: number;

  @ViewChild(SidePanelStepperComponent)
  stepper;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<MainComposition>,
              @Inject(MAT_DIALOG_DATA) data
  ) {
    super(null, dialogRef);

    this.shift        = data.shift;
    const initData: CalendarInitData = data.calendarInitData;
    this.employees    = initData.commonData.employees;
    this.calendarDays = initData.calendarDays;
    this.positions    = initData.commonData.positions;
  }

  fillInTheForm(t: MainComposition) {
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      shiftId:  [this.shift.id, [Validators.required]],
      from:     [moment.utc(this.calendarDays[0].isoString).startOf("month"), [Validators.required]],
      to:       [moment.utc(this.calendarDays[0].isoString).endOf("month"), [Validators.required]],
      units:    this.fb.array([], Validators.required)
    });

    this.clearSecondaryForm();
  }

  clearSecondaryForm() {
    this.secondaryForm = this.fb.group({
      employee: [null, [Validators.required]],
      position: [null, [Validators.required]]
    });
  }

  addToArray(form) {
    if (this.secondaryFormOperation === 'add') {
      this.getUnits().push(form);
    }
    this.prevStep();
  }

  getEmployeeShortName(employee: Employee): string {
    return getEmployeeShortName(employee);
  }

  getEmployeeFullName(employee: Employee): string {
    return getEmployeeFullName(employee);
  }

  getUnits(): FormArray {
    return this.dialogForm.get('units') as FormArray;
  }

  nextStep() {
    this.stepper.next();
  }

  prevStep() {
    this.stepper.previous();
    this.clearSecondaryForm();
  }

  removeUnit(index) {
    this.getUnits().removeAt(index);
  }

  addUnit() {
    this.secondaryFormOperation = 'add';
    this.nextStep();
  }

  editUnit(index) {
    this.secondaryFormOperation = 'edit';
    this.secondaryForm = this.getUnits().at(index);
    this.nextStep();
  }

  submit() {
    if (this.dialogForm.invalid) {
      return;
    }

    let result: MainComposition[] = [];

    const formValue = this.dialogForm.value;
    for (let unit of formValue.units) {

      const composition = new MainComposition();
      composition.departmentId = this.shift.departmentId;
      composition.shiftId     = this.shift.id;
      composition.employeeId  = unit.employee.id;
      composition.positionId  = unit.position.id;
      composition.from        = formValue.from;
      composition.to          = formValue.to;
      result.push(composition);

    }

    this.dialog.close(result);
  }
}
