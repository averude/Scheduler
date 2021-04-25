import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from "rxjs";
import { TableStateService } from "../../../lib/ngx-schedule-table/service/table-state.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AvrEntityGenerationDialogComponent } from "../../../lib/avr-entity-generation/avr-entity-generation-dialog/avr-entity-generation-dialog.component";
import { getGenerationUnits, toGenerationDto } from "../../../lib/avr-entity-generation/util/utils";
import { ShiftGenerationUnit } from "../../../model/ui/shift-generation-unit";
import { concatMap } from "rxjs/operators";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "../../../services/http/auth.service";
import { UserAccessRights } from "../../../model/user";
import { GenerationService } from "../../../services/http/generation.service";
import { Shift } from "../../../model/shift";

@Component({
  selector: 'app-working-norm-table-configuration-menu',
  templateUrl: './working-norm-table-configuration-menu.component.html',
  styleUrls: ['./working-norm-table-configuration-menu.component.css']
})
export class WorkingNormTableConfigurationMenuComponent implements OnInit, OnDestroy {

  @Input() departmentId: number;
  @Input() shifts: Shift[];

  accessRights: UserAccessRights;

  cellsState: number = 0;

  editableRowGroups: boolean = false;

  private cellStateSub:     Subscription;
  private editableStateSub: Subscription;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private tableStateService: TableStateService,
              private workingNormService: GenerationService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.cellStateSub = this.tableStateService.isCellShown
      .subscribe(status => this.cellsState = status);

    this.editableStateSub = this.tableStateService.editableGroupsState
      .subscribe(editableRowGroups => this.editableRowGroups = editableRowGroups);

    this.accessRights = this.authService.currentUserValue.accessRights;
  }

  ngOnDestroy(): void {
    if (this.cellStateSub) this.cellStateSub.unsubscribe();
    if (this.editableStateSub) {
      this.tableStateService.resetEditableState();
      this.editableStateSub.unsubscribe();
    }
  }

  openGenerateWorkingNormDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = getGenerationUnits(this.shifts);

    this.dialog.open(AvrEntityGenerationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(value => {
        if (value) {
          this.onWorkingNormGenerate(value);
        }
      });
  }

  onWorkingNormGenerate(generationUnits: ShiftGenerationUnit[]) {
    let dtos = generationUnits.map(unit => toGenerationDto(unit));

    from(dtos).pipe(
      concatMap(generationDto =>
        this.workingNormService.generateWorkingNorm(this.departmentId, generationDto))
    ).subscribe(res => this.notificationsService.success('Generated', res));
  }
}
