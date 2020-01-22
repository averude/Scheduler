import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DayType } from "../../../../../../model/day-type";
import { ShiftPattern } from "../../../../../../model/shift-pattern";
import { ScheduleGenerationService } from "../../../../../../services/schedule-generation.service";
import { PatternUnitService } from "../../../../../../services/pattern-unit.service";
import { ContextMenuComponent } from "../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { DayTypeGroup } from "../../../../../../model/day-type-group";
import { ScheduleService } from "../../../../../../services/schedule.service";
import { NotificationsService } from "angular2-notifications";
import * as moment from "moment";
import { WorkDay } from "../../../../../../model/workday";
import { RowRendererService } from "../../../../../../lib/ngx-schedule-table/service/row-renderer.service";
import { ClearSelectionService } from "../../../../../../lib/ngx-schedule-table/service/clear-selection.service";
import { SelectionEndService } from "../../../../../../lib/ngx-schedule-table/service/selection-end.service";
import { Subscription } from "rxjs";
import { ContextMenuService } from "../../../../../../lib/ngx-contextmenu/contextMenu.service";
import { SelectionData } from "../../../../../../lib/ngx-schedule-table/model/selection-data";

@Component({
  selector: 'app-schedule-table-context-menu',
  templateUrl: './schedule-table-context-menu.component.html',
  styleUrls: ['./schedule-table-context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableContextMenuComponent implements OnInit, OnDestroy {

  @ViewChild(ContextMenuComponent)
  patternMenu:  ContextMenuComponent;
  customHours:  number;
  offset:       number = 0;

  startTime:      string;
  endTime:        string;
  breakStartTime: string;
  breakEndTime:   string;

  @Input() dayTypes:      DayType[]       = [];
  @Input() dayTypeGroups: DayTypeGroup[]  = [];
  @Input() patterns:      ShiftPattern[]  = [];

  private selectionEndSub: Subscription;

  constructor(private rowRenderer: RowRendererService,
              private rowClearSelection: ClearSelectionService,
              private selectionEndService: SelectionEndService,
              private contextMenuService: ContextMenuService,
              private patternUnitService: PatternUnitService,
              private scheduleService: ScheduleService,
              private notificationService: NotificationsService,
              private scheduleGenerationService: ScheduleGenerationService) { }

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

  ngOnDestroy(): void {
    this.selectionEndSub.unsubscribe();
  }

  onSelect(dayType: DayType) {
    this.startTime      = dayType.startTime;
    this.endTime        = dayType.endTime;
    this.breakStartTime = dayType.breakStartTime;
    this.breakEndTime   = dayType.breakEndTime;
  }

  generateScheduleByCustomDay(dayType: DayType,
                              data: SelectionData) {
    this.scheduleGenerationService
      .generateScheduleBySingleDay(
        data.rowData,
        data.selectedCells,
        this.customHours,
        dayType,
        this.scheduleGeneratedHandler,
        this.errorHandler);
  }

  generateSchedule(pattern: ShiftPattern,
                   data: SelectionData) {
    this.patternUnitService.getByPatternId(pattern.id)
      .subscribe(patternUnits => {
        this.scheduleGenerationService
          .generateScheduleWithPattern(
            data.rowData,
            data.selectedCells,
            patternUnits,
            this.offset,
            false,
            this.scheduleGeneratedHandler,
            this.errorHandler)
      });
  }

  generateScheduleBySingleDay(dayType: DayType,
                              data: SelectionData) {
    this.scheduleGenerationService
      .generateScheduleBySingleDay(
        data.rowData,
        data.selectedCells,
        0,
        dayType,
        this.scheduleGeneratedHandler,
        this.errorHandler);
  }

  clearSelection() {
    this.rowClearSelection.clearSelection();
  }

  private get scheduleGeneratedHandler(): (rowData, selectedCells) => void {
    return (rowData, selectedCells) => {

      const createdSchedule = selectedCells
        .filter(cell => !cell.value.id)
        .map(cell => cell.value);

      const updatedSchedule = selectedCells
        .filter(cell => cell.value.id)
        .map(cell => cell.value);

      if (createdSchedule.length > 0) {
        this.scheduleService.create(createdSchedule)
          .subscribe(response => {
            this.createSchedule(rowData.workDays, response);
            this.rowRenderer.renderRow(rowData.id);
            this.notificationService.success(
              'Created',
              'Schedule sent successfully');
          }, err => selectedCells.forEach(cell => cell.revertChanges()));
      }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(updatedSchedule)
          .subscribe(res => {
            this.updateSchedule(rowData.workDays, updatedSchedule);
            this.rowRenderer.renderRow(rowData.id);
            this.notificationService.success(
              'Updated',
              'Schedule sent successfully');
          }, err => selectedCells.forEach(cell => cell.revertChanges()));
      }
    };
  };

  private get errorHandler(): (message) => void {
    return (message) => this.notificationService.error('Error', message);
  }

  private createSchedule(schedule: WorkDay[], createdSchedule: WorkDay[]) {
    createdSchedule.forEach(workDay => schedule.push(workDay));
    schedule.sort(((a, b) => moment(a.date).diff(moment(b.date))));
  }

  private updateSchedule(schedule: WorkDay[], updatedSchedule: WorkDay[]) {
    for (let scheduleIdx = 0, updatedScheduleIdx = 0; scheduleIdx < schedule.length; scheduleIdx++) {
      if (updatedScheduleIdx >= updatedSchedule.length) {
        break;
      }

      let oldValue = schedule[scheduleIdx];
      let newValue = updatedSchedule[updatedScheduleIdx];

      if (oldValue.date === newValue.date) {
        updatedScheduleIdx++;
        schedule[scheduleIdx] = newValue;
      }
    }
  }
}
