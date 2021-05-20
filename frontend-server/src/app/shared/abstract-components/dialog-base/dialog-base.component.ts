import { Directive, OnInit } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { IdEntity } from "../../../model/interface/id-entity";

@Directive()
export abstract class DialogBaseComponent<T> implements OnInit {
  operation: string;

  dialogForm: FormGroup;

  protected constructor(private entity: T,
                        protected dialog: MatDialogRef<any>) {
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

  compareNums(a: number, b: number): boolean {
    return a === b;
  }

  compareIdEntities(a: IdEntity, b: IdEntity): boolean {
    return (a && b) && (a.id === b.id);
  }

  getErrorMessage(): string {
    return 'Hey you';
  }

  submit() {
    if (this.dialogForm.invalid) {
      return;
    }

    this.dialog.close(this.dialogForm.value);
  }

  close() {
    this.dialog.close();
  }
}
