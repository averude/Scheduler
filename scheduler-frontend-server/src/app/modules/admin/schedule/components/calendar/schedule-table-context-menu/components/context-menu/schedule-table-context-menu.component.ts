import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ContextMenuComponent } from "../../../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { DayType } from "../../../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../../../model/day-type-group";
import { ShiftPattern } from "../../../../../../../../model/shift-pattern";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ScheduleGenerationService } from "../../../../../../../../services/generators/schedule-generation.service";
import { ClearSelectionService } from "../../../../../../../../lib/ngx-schedule-table/service/clear-selection.service";
import { SelectionEndService } from "../../../../../../../../lib/ngx-schedule-table/service/selection-end.service";
import { ContextMenuService } from "../../../../../../../../lib/ngx-contextmenu/contextMenu.service";
import { CustomDaytypeDialogComponent } from "../custom-daytype-dialog/custom-daytype-dialog.component";
import { SelectionData } from "../../../../../../../../lib/ngx-schedule-table/model/selection-data";

@Component({
  selector: 'app-schedule-table-context-menu',
  templateUrl: './schedule-table-context-menu.component.html',
  styleUrls: ['./schedule-table-context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableContextMenuComponent implements OnInit, OnDestroy {

  @ViewChild(ContextMenuComponent, { static: false })
  patternMenu:  ContextMenuComponent;
  offset:       number = 0;

  @Input() dayTypes:      DayType[]       = [];
  @Input() dayTypeGroups: DayTypeGroup[]  = [];
  @Input() patterns:      ShiftPattern[]  = [];

  private selectionEndSub: Subscription;

  constructor(private dialog: MatDialog,
              private scheduleGenerationService: ScheduleGenerationService,
              private rowClearSelection: ClearSelectionService,
              private selectionEndService: SelectionEndService,
              private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.selectionEndSub = this.selectionEndService.onSelectionEnd
      .subscribe(selectionData => {
        const selectedCells = selectionData.selectedCells;

        if (selectedCells && selectedCells.length > 0) {
          setTimeout(() => {
            this.contextMenuService.show.next({
              contextMenu: this.patternMenu,
              event: selectionData.event,
              item: selectionData,
            });
            selectionData.event.preventDefault();
            selectionData.event.stopPropagation();
          });
        }
      });
  }

  openCustomDayDialog(data: SelectionData) {
    const config = new MatDialogConfig();
    config.data = this.dayTypes;
    // config.hasBackdrop = false;

    this.dialog.open(CustomDaytypeDialogComponent, config)
      .afterClosed().subscribe(customDay => {
        if (customDay) {
          this.scheduleGenerationService.generateScheduleByPatternUnit(customDay, data);
        }
    });
  }

  ngOnDestroy(): void {
    this.selectionEndSub.unsubscribe();
  }

  clearSelection() {
    this.rowClearSelection.clearSelection();
  }
}
