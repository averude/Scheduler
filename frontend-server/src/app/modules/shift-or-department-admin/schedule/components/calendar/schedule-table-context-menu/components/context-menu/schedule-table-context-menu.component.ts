import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ContextMenuComponent } from "../../../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { forkJoin, Subscription } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ScheduleGenerationService } from "../../../../../../../../services/generators/schedule/schedule-generation.service";
import { ClearSelectionService } from "../../../../../../../../lib/ngx-schedule-table/service/clear-selection.service";
import { SelectionEndService } from "../../../../../../../../lib/ngx-schedule-table/service/selection-end.service";
import { ContextMenuService } from "../../../../../../../../lib/ngx-contextmenu/contextMenu.service";
import { CustomDaytypeDialogComponent } from "../custom-daytype-dialog/custom-daytype-dialog.component";
import { SelectionData } from "../../../../../../../../lib/ngx-schedule-table/model/selection-data";
import { DepartmentDayType } from "../../../../../../../../model/department-day-type";
import { BasicDto } from "../../../../../../../../model/dto/basic-dto";
import { PatternUnit } from "../../../../../../../../model/pattern-unit";
import { ShiftPatternDtoService } from "../../../../../../../../services/http/shift-pattern-dto.service";
import { DepartmentDayTypeService } from "../../../../../../../../services/http/department-day-type.service";
import { ShiftPattern } from "../../../../../../../../model/shift-pattern";
import { DayTypeService } from "../../../../../../../../services/http/day-type.service";

@Component({
  selector: 'app-schedule-table-context-menu',
  templateUrl: './schedule-table-context-menu.component.html',
  styleUrls: ['./schedule-table-context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableContextMenuComponent implements OnInit, OnDestroy {

  @ViewChild(ContextMenuComponent)
  patternMenu:  ContextMenuComponent;

  patternDtos:         BasicDto<ShiftPattern, PatternUnit>[]   = [];
  departmentDayTypes:  DepartmentDayType[] = [];
  serviceDayTypes:     DepartmentDayType[] = [];

  private selectionEndSub: Subscription;

  constructor(private dialog: MatDialog,
              private cd: ChangeDetectorRef,
              private shiftPatternDtoService: ShiftPatternDtoService,
              private dayTypeService: DayTypeService,
              private departmentDayTypeService: DepartmentDayTypeService,
              public  scheduleGenerationService: ScheduleGenerationService,
              private rowClearSelection: ClearSelectionService,
              private selectionEndService: SelectionEndService,
              private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    forkJoin([this.shiftPatternDtoService.getAll(),
      this.departmentDayTypeService.getAll(),
      this.dayTypeService.getAll()]
    ).subscribe(values => {
      this.patternDtos = values[0];
      this.departmentDayTypes = values[1];

      this.serviceDayTypes = values[2]
        .filter(dayType => dayType.usePreviousValue)
        .map(dayType => ({dayType: dayType, dayTypeId: dayType.id} as DepartmentDayType));
      this.cd.markForCheck();
    });

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
    config.data = this.departmentDayTypes;

    this.dialog.open(CustomDaytypeDialogComponent, config)
      .afterClosed().subscribe(customDay => {
        if (customDay) {
          this.scheduleGenerationService.generateScheduleByUnit(customDay, data);
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
