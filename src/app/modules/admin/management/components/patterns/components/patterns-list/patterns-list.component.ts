import { Component, Input, OnInit } from '@angular/core';
import { ShiftPattern } from '../../../../../../../model/shiftpattern';
import { PatternSwitchService } from '../../services/pattern-switch.service';
import { ShiftPatternService } from "../../../../../../../services/shiftpattern.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-patterns-list',
  templateUrl: './patterns-list.component.html',
  styleUrls: ['./patterns-list.component.css']
})
export class PatternsListComponent implements OnInit {

  @Input() departmentId: number;
  patterns: ShiftPattern[] = [];
  selectedPattern: ShiftPattern;

  constructor(private switchService: PatternSwitchService,
              private notificationService: NotificationsService,
              private shiftPatternService: ShiftPatternService) { }

  ngOnInit() {
    this.shiftPatternService
      .getAll()
      .subscribe(patterns => this.patterns = patterns);
  }

  selectPattern(pattern: ShiftPattern) {
    this.selectedPattern = pattern;
    this.switchService.changePattern(pattern.id);
  }

  save() {
    for (let i = 0; i < this.patterns.length; i++) {
      this.createOrUpdate(this.patterns[i]);
    }
  }

  addPattern() {
    const newPattern = new ShiftPattern();
    newPattern.departmentId = this.departmentId;
    this.patterns.push(newPattern);
  }

  removeSelectedPattern() {
    if (this.selectedPattern) {
      const index = this.patterns
        .findIndex(pattern => pattern === this.selectedPattern);
      this.patterns.splice(index, 1);
    }
  }

  private createOrUpdate(pattern: ShiftPattern) {
    if (pattern.id) {
      this.shiftPatternService.update(pattern)
        .subscribe(res => this.notificationService
          .success('Updated', 'Pattern was successfully updated'));
    } else {
      this.shiftPatternService.create(pattern)
        .subscribe(res => {
          pattern.id = res;
          this.notificationService
            .success('Created', 'Pattern was successfully created')
        });
    }
  }
}
