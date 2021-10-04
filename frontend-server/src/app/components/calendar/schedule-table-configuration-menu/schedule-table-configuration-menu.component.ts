import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
import { InitialData } from "../../../model/datasource/initial-data";

@Component({
  selector: 'app-schedule-table-configuration-menu',
  templateUrl: './schedule-table-configuration-menu.component.html',
  styleUrls: ['./schedule-table-configuration-menu.component.css']
})
export class ScheduleTableConfigurationMenuComponent implements OnInit, OnDestroy {

  @Input() enterpriseId: number;
  @Input() departmentId: number;
  @Input() initData: InitialData;

  @Output() onChangeHiddenRowVisibility: EventEmitter<boolean> = new EventEmitter<boolean>();

  isAble: boolean = false;

  accessRights: UserAccessRights;

  cellsState: number = 0;

  hiddenRowsIsShown: boolean = false;
  editableRowGroups: boolean = false;
  filterIsShown:     boolean;

  private cellStateSub:     Subscription;
  private editableStateSub: Subscription;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private tableStateService: TableStateService,
              private generationService: GenerationService,
              private notificationsService: NotificationsService) { }

  private filterIsShownSub: Subscription;

  ngOnInit() {
    this.cellStateSub = this.tableStateService.isCellShown
      .subscribe(status => this.cellsState = status);

    this.editableStateSub = this.tableStateService.editableGroupsState
      .subscribe(editableRowGroups => this.editableRowGroups = editableRowGroups);

    this.filterIsShownSub = this.tableStateService.isFilterIsShown()
      .subscribe(filterIsShown => this.filterIsShown = filterIsShown);

    this.accessRights = this.authService.currentUserValue.accessRights;

    this.setAbleFlag();
  }

  ngOnDestroy(): void {
    if (this.cellStateSub) this.cellStateSub.unsubscribe();
    this.filterIsShownSub.unsubscribe();
    if (this.editableStateSub) {
      this.tableStateService.resetEditableState();
      this.editableStateSub.unsubscribe();
    }
  }

  changeCellState() {
    this.tableStateService.nextCellStatus(this.cellsState == 0 ? 1 : 0);
  }

  changeEditableState() {
    this.tableStateService.changeEditableGroupsState(!this.editableRowGroups);
  }

  changeEmptyRowVisibility() {
    this.onChangeHiddenRowVisibility.emit(this.hiddenRowsIsShown = !this.hiddenRowsIsShown);
  }

  changeFilterVisibility() {
    this.onChangeHiddenRowVisibility.emit(!this.filterIsShown);
    this.hiddenRowsIsShown = !this.filterIsShown;
    this.tableStateService.filterShown(this.hiddenRowsIsShown);
  }

  openGenerateScheduleDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = getGenerationUnits(this.initData.shifts.filter(shift => !shift.hidden));

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
      concatMap(generationDto =>
        this.generationService.generateSchedule(this.enterpriseId, this.departmentId, generationDto))
    ).subscribe(res => this.notificationsService.success('Generated', res));
  }

  setAbleFlag() {
    this.isAble = (this.accessRights?.isDepartmentLevel || this.accessRights?.isEnterpriseLevel)
      && this.accessRights?.isAdmin;
  }
}
