import { Component, Input, OnInit } from '@angular/core';
import { ShiftPatternGenerationRule } from "../../../../../../../model/shift-pattern-generation-rule";
import { EXTRA_WEEKEND, EXTRA_WORK_DAY, HOLIDAY, WEEKEND } from "../../../../../../../model/special-calendar-date";
import { DayType } from "../../../../../../../model/day-type";
import { DepartmentDayType } from "../../../../../../../model/department-day-type";
import { ListItem } from "../common/list-item";

@Component({
  selector: 'app-pattern-rule',
  templateUrl: './pattern-rule.component.html',
  styleUrls: ['./pattern-rule.component.css']
})
export class PatternRuleComponent extends ListItem<ShiftPatternGenerationRule> implements OnInit {

  @Input() dayTypes: DayType[];
  @Input() departmentDayTypes: DepartmentDayType[];

  types: string[] = [HOLIDAY, EXTRA_WEEKEND, EXTRA_WORK_DAY, WEEKEND];

  ngOnInit(): void {

  }

}
