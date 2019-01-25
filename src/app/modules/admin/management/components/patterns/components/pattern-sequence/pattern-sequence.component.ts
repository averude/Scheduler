import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PatternUnit } from '../../../../../../../model/patternunit';
import { PatternSwitchService } from '../../pattern-switch.service';
import { Subscription } from 'rxjs';
import { DayType } from '../../../../../../../model/daytype';
import { DAYTYPES } from '../../../../../../../datasource/mock-daytypes';

@Component({
  selector: 'app-pattern-sequence',
  templateUrl: './pattern-sequence.component.html',
  styleUrls: ['./pattern-sequence.component.css']
})
export class PatternSequenceComponent implements OnInit, OnDestroy {

  units: PatternUnit[];
  private unitsSub: Subscription;

  dayTypes: DayType[] = DAYTYPES;

  constructor(private switchService: PatternSwitchService) { }

  ngOnInit() {
    this.unitsSub = this.switchService.units
      .subscribe(units => this.units = units);
  }

  ngOnDestroy(): void {
    this.unitsSub.unsubscribe();
  }

  addUnit() {
    const patternId = this.units[0].patternId;
    const lastOrderNum = this.units
      .sort((a, b) => a.orderId - b.orderId)[this.units.length - 1]
      .orderId;
    const newUnit = new PatternUnit();
    newUnit.patternId = patternId;
    newUnit.orderId = lastOrderNum + 1;
    this.units.push(newUnit);
  }
}
