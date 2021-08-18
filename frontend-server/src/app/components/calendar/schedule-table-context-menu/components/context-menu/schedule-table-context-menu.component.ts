import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { ContextMenuComponent } from "../../../../../lib/ngx-contextmenu/contextMenu.component";
import { forkJoin, Subscription } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ScheduleGenerationService } from "../../../../../services/generators/schedule/schedule-generation.service";
import { ClearSelectionService } from "../../../../../lib/ngx-schedule-table/service/clear-selection.service";
import { SelectionEndService } from "../../../../../lib/ngx-schedule-table/service/selection-end.service";
import { ContextMenuService } from "../../../../../lib/ngx-contextmenu/contextMenu.service";
import { CustomDaytypeDialogComponent } from "../custom-daytype-dialog/custom-daytype-dialog.component";
import { SelectionData } from "../../../../../lib/ngx-schedule-table/model/selection-data";
import { DepartmentDayType } from "../../../../../model/department-day-type";
import { BasicDTO } from "../../../../../model/dto/basic-dto";
import { PatternUnit } from "../../../../../model/pattern-unit";
import { ShiftPatternDtoService } from "../../../../../services/http/shift-pattern-dto.service";
import { DepartmentDayTypeService } from "../../../../../services/http/department-day-type.service";
import { ShiftPattern } from "../../../../../model/shift-pattern";
import { DayTypeService } from "../../../../../services/http/day-type.service";
import { TableStateService } from "../../../../../lib/ngx-schedule-table/service/table-state.service";
import { CalendarDay } from "../../../../../lib/ngx-schedule-table/model/calendar-day";
import { TableManager } from "../../../schedule-table-composition-management/manager/table-manager";
import { InitialData } from "../../../../../model/datasource/initial-data";
import { TableData } from "../../../../../lib/ngx-schedule-table/model/data/table";

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

  private initialData: InitialData;

  get initData(): InitialData {
    return this.initialData;
  }

  @Input() set initData(initData: InitialData) {
    this.initialData = initData;

    this.serviceDayTypes = [];
    if (initData) {
      for (let dayType of initData.dayTypeMap.values()) {
        if (dayType.usePreviousValue) {
          this.serviceDayTypes.push({dayType: dayType} as DepartmentDayType);
        }
      }
    }
  };

  @Input() isEditableGroups: boolean = false;
  @Input() tableData: TableData;

  @Input() enterpriseId: number;
  @Input() departmentId: number;

  patternDTOs:         BasicDTO<ShiftPattern, PatternUnit>[]   = [];
  departmentDayTypes:  DepartmentDayType[] = [];
  serviceDayTypes:     DepartmentDayType[] = [];

  noServiceDepartmentDayTypes: DepartmentDayType[] = [];

  private selectionEndSub: Subscription;
  private headerCellClickSub: Subscription;

  constructor(private dialog: MatDialog,
              private cd: ChangeDetectorRef,
              private tableManager: TableManager,
              private shiftPatternDtoService: ShiftPatternDtoService,
              private dayTypeService: DayTypeService,
              private departmentDayTypeService: DepartmentDayTypeService,
              public  scheduleGenerationService: ScheduleGenerationService,
              private rowClearSelection: ClearSelectionService,
              private selectionEndService: SelectionEndService,
              private tableState: TableStateService,
              private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    if (!this.departmentId) {
      return;
    }

    forkJoin([
      this.shiftPatternDtoService.getAllByDepartmentId(this.departmentId),
      this.departmentDayTypeService.getAllByDepartmentId(this.departmentId),
    ]).subscribe(values => {
      this.patternDTOs = values[0];
      this.departmentDayTypes = values[1];
      this.noServiceDepartmentDayTypes = values[1]
        .filter(departmentDayType => !departmentDayType.dayType.usePreviousValue);

      this.cd.detectChanges();
    });

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
          this.scheduleGenerationService.generateScheduleByUnit(this.initData, customDay, selectionData);
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

      this.scheduleGenerationService.generateForCells(this.initData, departmentDayType, cells);
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
    this.scheduleGenerationService.generateSchedule(this.initData, dto, event, offset);
  }

  byDepartmentDayType(departmentDayType, event) {
    this.scheduleGenerationService.generateScheduleByDepartmentDayType(this.initData, departmentDayType, event);
  }

}
