import { Component, OnInit } from '@angular/core';
import { ShiftPattern } from '../../../../../../../model/shiftpattern';
import { PATTERNS } from '../../../../../../../datasource/mock-patterns';
import { PatternSwitchService } from '../../pattern-switch.service';
import { TOKENS } from '../../../../../../../datasource/mock-patternunits';

@Component({
  selector: 'app-patterns-list',
  templateUrl: './patterns-list.component.html',
  styleUrls: ['./patterns-list.component.css']
})
export class PatternsListComponent implements OnInit {

  patterns: ShiftPattern[] = PATTERNS;

  constructor(private switchService: PatternSwitchService) { }

  ngOnInit() {
  }

  selectPattern(pattern: ShiftPattern) {
    this.switchService.changeUnits(TOKENS
      .filter(value => value.patternId === pattern.id));
  }
}
