import { Component, Input, OnInit } from '@angular/core';
import { PatternUnit } from '../../../../../../../model/patternunit';
import { DayType } from '../../../../../../../model/daytype';

@Component({
  selector: 'app-pattern-unit',
  templateUrl: './pattern-unit.component.html',
  styleUrls: ['./pattern-unit.component.css']
})
export class PatternUnitComponent implements OnInit {

  @Input()
  unit: PatternUnit;
  @Input()
  dayTypes: DayType[];
  constructor() { }

  ngOnInit() {
  }

}
