import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { ReportSheetDTO } from "../../../../../model/dto/report-sheet-dto";
import { AuthService } from "../../../../../services/http/auth.service";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Shift } from "../../../../../model/shift";
import { ReportSheetParticipant } from "../../../../../model/report-sheet";

@Component({
  selector: 'app-report-sheet-dialog',
  templateUrl: './report-sheet-dialog.component.html',
  styleUrls: ['./report-sheet-dialog.component.css']
})
export class ReportSheetDialogComponent extends DialogBaseComponent<ReportSheetDTO> {
  private readonly departmentId: number;

  shifts: Shift[];

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<ReportSheetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);
    this.shifts       = data.shifts;
    this.departmentId = data.departmentId;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      reportSheet: this.fb.group({
        id:           [],
        departmentId: [this.departmentId],
        name:         ['', Validators.required],
        caption:      [''],
        creators: this.fb.array([this.fb.group({
            position: [''],
            name:     ['']
          })]),
        approved: this.reportSheetParticipant,
        agreed:   this.reportSheetParticipant
      }),
      shiftIds:       [null, Validators.required]
    })
  }

  fillInTheForm(dto: ReportSheetDTO) {

    const reportSheet = dto.reportSheet;

    const reportSheetForm = this.dialogForm.get('reportSheet');
    reportSheetForm.patchValue({
      id:           reportSheet.id,
      departmentId: reportSheet.departmentId,
      name:         reportSheet.name,
      caption:      reportSheet.caption
    });

    this.patchFormControl(reportSheetForm.get('approved'), reportSheet.approved);
    this.patchFormControl(reportSheetForm.get('agreed'), reportSheet.agreed);

    if (dto.reportSheet.creators) {
      this.creators.clear();
      dto.reportSheet.creators
        .forEach(creator => this.creators.push(this.createNewCreatorControl(creator)));
    }

    this.dialogForm.patchValue({
      shiftIds: dto.shiftIds
    });
  }

  private patchFormControl(control: AbstractControl,
                           participant: ReportSheetParticipant) {
    if (participant) {
      control.patchValue({
        position: participant.position,
        name:     participant.name
      });
    }
  }

  createNewCreatorControl(participant: ReportSheetParticipant): FormGroup {
    return this.fb.group({
      position: [participant.position],
      name:     [participant.name]
    });
  }

  get reportSheetParticipant(): FormGroup {
    return this.fb.group({
      position: [''],
      name:     ['']
    });
  }

  get creators(): FormArray {
    return this.dialogForm.get('reportSheet').get('creators') as FormArray;
  }

  addCreator() {
    this.creators.push(this.reportSheetParticipant);
  }

  removeCreator(index: number) {
    this.creators.removeAt(index);
  }
}
