import { Component, OnDestroy, OnInit } from '@angular/core';
import { PatternUnit } from '../../../../../../../model/patternunit';
import { PatternSwitchService } from '../../services/pattern-switch.service';
import { Subscription } from 'rxjs';
import { DayType } from '../../../../../../../model/daytype';
import { DAYTYPES } from '../../../../../../../datasource/mock-daytypes';
import { UnitControlService } from "../../services/unit-control.service";

@Component({
  selector: 'app-pattern-sequence',
  templateUrl: './pattern-sequence.component.html',
  styleUrls: ['./pattern-sequence.component.css']
})
export class PatternSequenceComponent implements OnInit, OnDestroy {

  units: PatternUnit[];
  private unitsSub:     Subscription;
  private unitUpSub:    Subscription;
  private unitDownSub:  Subscription;
  private unitDelSub:   Subscription;

  dayTypes: DayType[] = DAYTYPES;

  constructor(private switchService: PatternSwitchService,
              private unitControlService: UnitControlService) { }

  ngOnInit() {
    this.unitsSub = this.switchService.units
      .subscribe(units => this.units = units);
    this.unitUpSub = this.unitControlService.getMoveUp()
      .subscribe(unit => this.moveUp(unit));
    this.unitDownSub = this.unitControlService.getMoveDown()
      .subscribe( unit => this.moveDown(unit));
    this.unitDelSub = this.unitControlService.getDelete()
      .subscribe(unit => this.removeFromUnits(unit));
  }

  ngOnDestroy(): void {
    this.unitsSub.unsubscribe();
    this.unitUpSub.unsubscribe();
    this.unitDownSub.unsubscribe();
    this.unitDelSub.unsubscribe();
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

  private moveUp(patternUnit: PatternUnit) {
    const orderNumber = patternUnit.orderId;
    if (orderNumber > 1) {
      this.swapInUnits(patternUnit, orderNumber - 1);
    }
  }

  private moveDown(patternUnit: PatternUnit) {
    const size = this.units.length;
    const orderNumber = patternUnit.orderId;
    if (size > orderNumber && orderNumber !== 0) {
      this.swapInUnits(patternUnit, orderNumber + 1);
    }
  }

  private swapInUnits(fromUnit: PatternUnit, to: number) {
    const fromNum = fromUnit.orderId;
    const toUnit = this.units.find(value => value.orderId === to);
    fromUnit.orderId = to;
    toUnit.orderId = fromNum;
    this.units.sort((a,b) => a.orderId - b.orderId);
  }

  // Keep an eye on this method because it works only with sorted array
  private removeFromUnits(unit: PatternUnit) {
    const index = this.units.findIndex(value => value.id === unit.id);
    this.units.splice(index, 1);
    for (let i = index; i < this.units.length; i++) {
      this.units[i].orderId--;
    }
  }
}
