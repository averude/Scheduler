import { Component, Input, OnInit } from '@angular/core';
import {
  PATTERN_RULE_TYPES,
  ShiftPatternGenerationRule
} from "../../../../../../../model/shift-pattern-generation-rule";

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

  types: string[] = PATTERN_RULE_TYPES;

  ngOnInit(): void {

  }

}
