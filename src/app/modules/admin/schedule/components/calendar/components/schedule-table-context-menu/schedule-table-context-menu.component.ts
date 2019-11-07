import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DayType } from "../../../../../../../model/day-type";
import { ContextMenuData } from "../../../../../../../model/ui/context-menu-data";
import { ShiftPattern } from "../../../../../../../model/shift-pattern";
import { ScheduleGenerationService } from "../../../../../../../services/schedule-generation.service";
import { PatternUnitService } from "../../../../../../../services/pattern-unit.service";
import { ContextMenuComponent } from "../../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { ScheduleTableUtils } from "../../utils/schedule-table-utils";
import { ScheduleService } from "../../../../../../../services/schedule.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-schedule-table-context-menu',
  templateUrl: './schedule-table-context-menu.component.html',
  styleUrls: ['./schedule-table-context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableContextMenuComponent implements OnInit {

  @ViewChild(ContextMenuComponent)
  patternMenu:  ContextMenuComponent;
  customHours:  number;
  offset:       number = 0;

  @Output() onContextMenuClose: EventEmitter<void> = new EventEmitter();

  @Input() dayTypes: DayType[]            = [];
  @Input() dayTypeGroups: DayTypeGroup[]  = [];
  @Input() patterns: ShiftPattern[]       = [];

  constructor(private patternUnitService: PatternUnitService,
              private utils: ScheduleTableUtils,
              private scheduleService: ScheduleService,
              private notificationService: NotificationsService,
              private scheduleGenerationService: ScheduleGenerationService) { }

  ngOnInit() {
  }

  getDayTypesWithDefaultHours(): DayType[] {
    return this.dayTypes.filter(dayType => dayType.defaultValue !== null);
  }

  getPatternsWithOverrideExistingValues(): ShiftPattern[] {
    return this.patterns.filter(pattern => pattern.overrideExistingValues);
  }

  getPatternsWithoutOverrideExistingValues(): ShiftPattern[] {
    return this.patterns.filter(pattern => !pattern.overrideExistingValues);
  }

  generateScheduleByCustomDay(dayType: DayType,
                              data: ContextMenuData) {
    this.scheduleGenerationService
      .generateScheduleBySingleDay(
        data.employeeId,
        data.selectedCells,
        this.customHours,
        dayType,
        this.scheduleGeneratedHandler,
        this.errorHandler);
  }

  generateSchedule(pattern: ShiftPattern,
                   data: ContextMenuData) {
    this.patternUnitService.getByPatternId(pattern.id)
      .subscribe(patternUnits => {
        this.scheduleGenerationService
          .generateScheduleWithPattern(
            data.employeeId,
            data.selectedCells,
            patternUnits,
            this.offset,
            pattern.overrideExistingValues,
            this.scheduleGeneratedHandler,
            this.errorHandler)
      });
  }

  generateScheduleBySingleDay(dayType: DayType,
                              data: ContextMenuData) {
    this.scheduleGenerationService
      .generateScheduleBySingleDay(
        data.employeeId,
        data.selectedCells,
        dayType.defaultValue,
        dayType,
        this.scheduleGeneratedHandler,
        this.errorHandler);
  }

  clearSelection() {
    this.onContextMenuClose.emit();
  }

  private get scheduleGeneratedHandler(): (cells) => void {
    return cells => {
      const createdCells = cells
        .filter(cell => !cell.workDay.id);
      const createdSchedule = createdCells
        .map(cell => cell.workDay);

      const updatedCells = cells
        .filter(cell => cell.workDay.id);
      const updatedSchedule = updatedCells
        .map(cell => cell.workDay);

      if (createdSchedule.length > 0) {
        this.scheduleService.create(createdSchedule)
          .subscribe(response => {
            let workDayIndex = 0;
            createdCells.forEach(cell => {
              let workDay = response[workDayIndex];
              if (cell.day.isoString == workDay.date) {
                workDayIndex++;
                cell.workDay = workDay;
                cell.refreshLabel();
              }
            });
            this.notificationService.success(
              'Created',
              'Schedule sent successfully');
          }, err => cells.forEach(cell => cell.revertChanges()));
      }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(updatedSchedule)
          .subscribe(res => {
            updatedCells.forEach(cell => cell.refreshLabel());
            this.notificationService.success(
              'Updated',
              'Schedule sent successfully');
          }, err => cells.forEach(cell => cell.revertChanges()));
      }
    };
  };

  private get errorHandler(): (message) => void {
    return (message) => this.notificationService.error('Error', message);
  }
}
