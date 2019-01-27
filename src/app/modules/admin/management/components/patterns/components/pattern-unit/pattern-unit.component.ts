import {Component, Input, OnInit} from '@angular/core';
import { PatternUnit } from '../../../../../../../model/patternunit';
import { DayType } from '../../../../../../../model/daytype';
import { UnitControlService } from "../../services/unit-control.service";

@Component({
  selector: 'app-pattern-unit',
  templateUrl: './pattern-unit.component.html',
  styleUrls: ['./pattern-unit.component.css']
})
export class PatternUnitComponent implements OnInit {

  @Input() unit: PatternUnit;
  @Input() dayTypes: DayType[];

  constructor(private unitControlService: UnitControlService) { }

  ngOnInit() {
  }

  moveUp() {
    this.unitControlService.moveUp(this.unit);
  }

  moveDown() {
    this.unitControlService.moveDown(this.unit);
  }

  delete() {
    this.unitControlService.delete(this.unit);
  }
}
