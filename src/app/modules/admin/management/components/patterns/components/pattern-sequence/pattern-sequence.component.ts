import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PatternUnit } from '../../../../../../../model/patternunit';
import { PatternSwitchService } from '../../services/pattern-switch.service';
import { Subscription } from 'rxjs';
import { DayType } from '../../../../../../../model/daytype';
import { UnitControlService } from "../../services/unit-control.service";
import { mergeMap } from "rxjs/operators";
import { PatternUnitService } from "../../../../../../../services/pattern-unit.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-pattern-sequence',
  templateUrl: './pattern-sequence.component.html',
  styleUrls: ['./pattern-sequence.component.css']
})
export class PatternSequenceComponent implements OnInit, OnDestroy {

  @Input() dayTypes: DayType[];

  units: PatternUnit[] = [];
  patternId: number;
  // Subscriptions
  private unitsSub:     Subscription;
  private unitUpSub:    Subscription;
  private unitDownSub:  Subscription;
  private unitDelSub:   Subscription;

  constructor(private switchService: PatternSwitchService,
              private unitControlService: UnitControlService,
              private notificationService: NotificationsService,
              private patternUnitService: PatternUnitService) { }

  ngOnInit() {
    this.unitsSub = this.switchService.patternId
      .pipe(mergeMap(patternId => {
        if (patternId) {
          this.patternId = patternId;
          return this.patternUnitService
            .getByPatternId(patternId);
        }

      }))
      .subscribe(units => this.units = units);
    this.unitUpSub = this.unitControlService.getMoveUp()
      .subscribe(unit => this.moveUp(unit));
    this.unitDownSub = this.unitControlService.getMoveDown()
      .subscribe( unit => this.moveDown(unit));
    this.unitDelSub = this.unitControlService.getDelete()
      .subscribe(unit => this.removeUnit(unit));
  }

  ngOnDestroy(): void {
    this.unitsSub.unsubscribe();
    this.unitUpSub.unsubscribe();
    this.unitDownSub.unsubscribe();
    this.unitDelSub.unsubscribe();
  }

  save() {
    for (let i = 0; i < this.units.length; i++) {
      this.createOrUpdate(this.units[i]);
    }
  }

  addUnit() {
    const newUnit = new PatternUnit();
    newUnit.patternId = this.patternId;
    newUnit.orderId = this.lastOrderId + 1;
    this.units.push(newUnit);
  }

  private moveUp(patternUnit: PatternUnit) {
    const orderNumber = patternUnit.orderId;
    if (orderNumber > 1) {
      this.swapUnits(patternUnit, orderNumber - 1);
    }
  }

  private moveDown(patternUnit: PatternUnit) {
    const size = this.units.length;
    const orderNumber = patternUnit.orderId;
    if (size > orderNumber && orderNumber !== 0) {
      this.swapUnits(patternUnit, orderNumber + 1);
    }
  }

  private swapUnits(fromUnit: PatternUnit, to: number) {
    const fromNum = fromUnit.orderId;
    const toUnit = this.units.find(value => value.orderId === to);
    fromUnit.orderId = to;
    toUnit.orderId = fromNum;
    this.units.sort((a,b) => a.orderId - b.orderId);
  }

  // Keep an eye on this method because it works correctly
  // only with sorted array
  private removeUnit(unit: PatternUnit) {
    const index = this.units.findIndex(value => value === unit);
    this.units.splice(index, 1);
    for (let i = index; i < this.units.length; i++) {
      this.units[i].orderId--;
    }
  }

  private get lastOrderId(): number {
    if (this.units.length > 0) {
      return this.units
        .sort((a, b) => a.orderId - b.orderId)[this.units.length - 1]
        .orderId;
    } else {
      return 0;
    }
  }

  private createOrUpdate(unit: PatternUnit) {
    console.log(unit);
    if (unit.id) {
      this.patternUnitService.update(unit)
        .subscribe(res => this.notificationService
          .success("Unit was successfully updated"));
    } else {
      this.patternUnitService.create(unit)
        .subscribe(res => this.notificationService
          .success("Unit was successfully created"));
    }
  }
}
