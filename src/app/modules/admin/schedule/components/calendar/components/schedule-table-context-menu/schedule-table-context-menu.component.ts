import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DayType } from "../../../../../../../model/day-type";
import { ContextMenuData } from "../../../../../../../model/ui/context-menu-data";
import { ShiftPattern } from "../../../../../../../model/shift-pattern";
import { ScheduleGenerationService } from "../../../../../../../services/schedule-generation.service";
import { PatternUnitService } from "../../../../../../../services/pattern-unit.service";
import { ContextMenuComponent } from "../../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";

@Component({
  selector: 'app-schedule-table-context-menu',
  templateUrl: './schedule-table-context-menu.component.html',
  styleUrls: ['./schedule-table-context-menu.component.css']
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
        data.generatedHandler,
        data.errorHandler);
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
            data.generatedHandler,
            data.errorHandler)
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
        data.generatedHandler,
        data.errorHandler);
  }

  clearSelection() {
    this.onContextMenuClose.emit();
  }
}
