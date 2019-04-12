import { OnInit } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";

export abstract class DialogBaseComponent<T> implements OnInit {
  operation: string;
  entity: T;

  dialogForm: FormGroup;

  protected constructor(entity: T) {
    this.entity = entity;
    if (this.entity) {
      this.operation = 'Edit';
    } else {
      this.operation = 'Add';
    }
  }

  ngOnInit(): void {
    this.initTheForm();
    if (this.entity) {
      this.fillInTheForm(this.entity);
    }
  }

  abstract initTheForm();

  abstract fillInTheForm(t: T);

  isControlInvalid(controlName: string): boolean {
    let control = this.dialogForm.controls[controlName];
    return control.invalid && control.touched;
  }

  getControlErrors(controlName: string): ValidationErrors {
    return this.dialogForm.controls[controlName].errors;
  }

  compare(a: number, b: number): boolean {
    return a === b;
  }

  getErrorMessage(): string {
    return 'Hey you';
  }
}
