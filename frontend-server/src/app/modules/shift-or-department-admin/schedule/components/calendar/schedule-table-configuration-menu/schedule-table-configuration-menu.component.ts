import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from "rxjs";
import { TableStateService } from "../../../../../../lib/ngx-schedule-table/service/table-state.service";
import { TableDataSource } from "../collectors/table-data-source";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AvrEntityGenerationDialogComponent } from "../../../../../../lib/avr-entity-generation/avr-entity-generation-dialog/avr-entity-generation-dialog.component";
import { getGenerationUnits, toGenerationDto } from "../../../../../../lib/avr-entity-generation/util/utils";
import { ShiftGenerationUnit } from "../../../../../../model/ui/shift-generation-unit";
import { concatMap } from "rxjs/operators";
import { ScheduleService } from "../../../../../../services/http/schedule.service";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "../../../../../../services/http/auth.service";
import { UserAccessRights } from "../../../../../../model/user";

@Component({
  selector: 'app-schedule-table-configuration-menu',
  templateUrl: './schedule-table-configuration-menu.component.html',
  styleUrls: ['./schedule-table-configuration-menu.component.css']
})
export class ScheduleTableConfigurationMenuComponent implements OnInit, OnDestroy {

  accessRights: UserAccessRights;

  cellsState: number = 0;

  editableRowGroups: boolean = false;
  private cellStateSub:     Subscription;

  private editableStateSub: Subscription;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private tableStateService: TableStateService,
              private tableDataSource: TableDataSource,
              private scheduleService: ScheduleService,
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
    if (this.editableStateSub) this.editableStateSub.unsubscribe();
  }

  changeCellState() {
    this.tableStateService.nextCellStatus(this.cellsState == 0 ? 1 : 0);
  }

  changeEditableState() {
    this.tableStateService.changeEditableGroupsState(!this.editableRowGroups);
  }

  openGenerateScheduleDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = getGenerationUnits(this.tableDataSource.shifts);

    this.dialog.open(AvrEntityGenerationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(value => {
        if (value) {
          this.onScheduleGenerate(value);
        }
      });
  }

  onScheduleGenerate(generationUnits: ShiftGenerationUnit[]) {
    let dtos = generationUnits.map(unit => toGenerationDto(unit));

    from(dtos).pipe(
      concatMap(generationDto => this.scheduleService.generate(generationDto))
    ).subscribe(res => this.notificationsService.success('Generated', res));
  }
}
