import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ContextMenuComponent } from "../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ScheduleGenerationService } from "../../../../service/schedule-generation.service";
import { ClearSelectionService } from "../../../../../../lib/ngx-schedule-table/service/clear-selection.service";
import { SelectionEndService } from "../../../../../../lib/ngx-schedule-table/service/selection-end.service";
import { ContextMenuService } from "../../../../../../lib/ngx-contextmenu/contextMenu.service";
import { CustomDaytypeDialogComponent } from "../custom-daytype-dialog/custom-daytype-dialog.component";
import { SelectionData } from "../../../../../../lib/ngx-schedule-table/model/selection-data";
import { DepartmentDayType } from "../../../../../../model/department-day-type";
import { TableStateService } from "../../../../../../lib/ngx-schedule-table/service/table-state.service";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { TableManager } from "../../../schedule-table-composition-management/manager/table-manager";
import { TableData } from "../../../../../../lib/ngx-schedule-table/model/data/table";
import { CalendarInitData } from "../../../../model/calendar-init-data";

@Component({
  selector: 'app-schedule-table-context-menu',
  templateUrl: './schedule-table-context-menu.component.html',
  styleUrls: ['./schedule-table-context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableContextMenuComponent implements OnInit, OnDestroy {

  @ViewChild('tableCellMenu')
  tableCellMenu:  ContextMenuComponent;

  @ViewChild('tableHeaderMenu')
  tableHeaderMenu: ContextMenuComponent;

  private initialData: CalendarInitData;

  serviceDayTypes:     DepartmentDayType[] = [];
  noServiceDepartmentDayTypes: DepartmentDayType[] = [];

  get calendarInitData(): CalendarInitData {
    return this.initialData;
  }

  @Input() set calendarInitData(calendarInitData: CalendarInitData) {
    this.initialData = calendarInitData;

    this.serviceDayTypes = [];

    if (calendarInitData) {
      for (let dayType of calendarInitData.commonDataMaps.dayTypeMap.values()) {
        if (dayType.usePreviousValue) {
          this.serviceDayTypes.push({dayType: dayType} as DepartmentDayType);
        }
      }

      this.noServiceDepartmentDayTypes = calendarInitData.adminData?.departmentDayTypes
        ?.filter(departmentDayType => !departmentDayType.dayType.usePreviousValue);
    }
  };

  @Input() isEditableGroups: boolean = false;
  @Input() tableData: TableData;

  private selectionEndSub: Subscription;
  private headerCellClickSub: Subscription;

  constructor(private dialog: MatDialog,
              private tableManager: TableManager,
              public  scheduleGenerationService: ScheduleGenerationService,
              private rowClearSelection: ClearSelectionService,
              private selectionEndService: SelectionEndService,
              private tableState: TableStateService,
              private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.selectionEndSub = this.selectionEndService.onSelectionEnd
      .subscribe(selectionData => {
        const selectedCells = selectionData.selectedCells;

        if (selectedCells && selectedCells.length > 0) {
          setTimeout(() => {
            this.contextMenuService.show.next({
              contextMenu: this.tableCellMenu,
              event:  selectionData.event,
              item:   selectionData,
            });
            selectionData.event.preventDefault();
            selectionData.event.stopPropagation();
          });
        }
      });

    this.headerCellClickSub = this.tableState.onHeaderCellClick()
      .subscribe(value => {
        if (value) {
          setTimeout(() => {
            this.contextMenuService.show.next({
              contextMenu: this.tableHeaderMenu,
              event:  value.event,
              item:   value.value
            });
            value.event.preventDefault();
            value.event.stopPropagation();
          });
        }
      });
  }

  openCustomDayDialog(selectionData: SelectionData) {
    const config = new MatDialogConfig();
    config.data = this.noServiceDepartmentDayTypes;

    this.dialog.open(CustomDaytypeDialogComponent, config)
      .afterClosed().subscribe(customDay => {
        if (customDay) {
          this.scheduleGenerationService.generateScheduleByUnit(this.calendarInitData, customDay, selectionData);
        }
    });
  }

  openAddSubstitutionDialog(selectionData: SelectionData) {
    this.tableManager.addSubstitutionDialog(selectionData, this.initialData);
  }

  ngOnDestroy(): void {
    this.selectionEndSub.unsubscribe();
    this.headerCellClickSub.unsubscribe();
  }

  clearSelection() {
    this.rowClearSelection.clearSelection();
  }

  generateForShift(shiftId: number,
                   departmentDayType: DepartmentDayType,
                   day: CalendarDay) {
    const rowGroup = this.tableData.findRowGroup(shiftId);
    if (rowGroup) {
      const cells = [];

      for (let row of rowGroup.rows) {
        const cell = row.cells[day.dayOfMonth - 1];
        if (cell.enabled) {
          cells.push(cell);
        }
      }

      this.scheduleGenerationService.generateForCells(this.calendarInitData, departmentDayType, cells);
    }
  }

  openShiftCustomDayDialog(shiftId: number, day: CalendarDay) {
    const config = new MatDialogConfig();
    config.data = this.noServiceDepartmentDayTypes;

    this.dialog.open(CustomDaytypeDialogComponent, config)
      .afterClosed().subscribe(customDay => {
      if (customDay) {
        this.generateForShift(shiftId, customDay, day);
      }
    });
  }

  byPattern(dto, event, offset) {
    this.scheduleGenerationService.generateSchedule(this.calendarInitData, dto, event, offset);
  }

  byDepartmentDayType(departmentDayType, event) {
    this.scheduleGenerationService.generateScheduleByDepartmentDayType(this.calendarInitData, departmentDayType, event);
  }

}
