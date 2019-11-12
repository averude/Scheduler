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
import * as moment from "moment";
import { RowChangeDetection } from "../table-service/row-change-detection";
import { WorkDay } from "../../../../../../../model/workday";

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

  @Input() dayTypes:      DayType[]       = [];
  @Input() dayTypeGroups: DayTypeGroup[]  = [];
  @Input() patterns:      ShiftPattern[]  = [];

  constructor(private rowCd: RowChangeDetection,
              private patternUnitService: PatternUnitService,
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
        data.row,
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
            data.row,
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
        data.row,
        data.selectedCells,
        dayType.defaultValue,
        dayType,
        this.scheduleGeneratedHandler,
        this.errorHandler);
  }

  clearSelection() {
    this.onContextMenuClose.emit();
  }

  private get scheduleGeneratedHandler(): (row, selectedCells) => void {
    return (row, selectedCells) => {

      const createdSchedule = selectedCells
        .filter(cell => !cell.workDay.id)
        .map(cell => cell.workDay);

      const updatedSchedule = selectedCells
        .filter(cell => cell.workDay.id)
        .map(cell => cell.workDay);

      if (createdSchedule.length > 0) {
        this.scheduleService.create(createdSchedule)
          .subscribe(response => {
            this.createSchedule(row.schedule, response);
            this.rowCd.markForChange(row.employee.id);
            this.notificationService.success(
              'Created',
              'Schedule sent successfully');
          }, err => selectedCells.forEach(cell => cell.revertChanges()));
      }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(updatedSchedule)
          .subscribe(res => {
            this.updateSchedule(row.schedule, updatedSchedule);
            this.rowCd.markForChange(row.employee.id);
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
