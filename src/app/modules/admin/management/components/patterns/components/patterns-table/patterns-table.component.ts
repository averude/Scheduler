import { Component } from '@angular/core';
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { ShiftPattern } from "../../../../../../../model/shiftpattern";
import { ShiftPatternService } from "../../../../../../../services/shiftpattern.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { map } from "rxjs/operators";
import { PatternUnitService } from "../../../../../../../services/pattern-unit.service";
import { DayTypeService } from "../../../../../../../services/daytype.service";
import { DayType } from "../../../../../../../model/daytype";
import { PatternDialogComponent, ShiftPatternWrapper } from "../pattern-dialog/pattern-dialog.component";
import { PatternUnit } from "../../../../../../../model/patternunit";

@Component({
  selector: 'app-patterns-table',
  templateUrl: './patterns-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css','./patterns-table.component.css']
})
export class PatternsTableComponent extends TableBaseComponent<ShiftPattern> {

  displayedColumns = ['select', 'name', 'pattern', 'control'];

  patternUnits: any = [];
  dayTypes: DayType[];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private dayTypeService: DayTypeService,
              private shiftPatternService: ShiftPatternService,
              private patternUnitService: PatternUnitService) { super(); }

  ngOnInit() {
    this.initDataSource();
    this.shiftPatternService.getAll()
      .pipe(map(patterns => {
        patterns.forEach(pattern =>
          this.patternUnitService.getByPatternId(pattern.id)
            .subscribe(units => {
              this.patternUnits[pattern.id] = units;
            }));
        return patterns;
      }))
      .subscribe(patterns => this.dataSource.data = patterns);
    this.dayTypeService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes);
  }

  openDialog(shiftPattern: ShiftPattern) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      pattern: shiftPattern,
      units: shiftPattern ? this.patternUnits[shiftPattern.id] : undefined,
      dayTypes: this.dayTypes
    };

    let dialogRef = this.dialog.open(PatternDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe((wrapper: ShiftPatternWrapper) => {
        if (!wrapper) {
          return;
        }

        if (wrapper.pattern) {
          this.createOrUpdatePattern(wrapper.pattern, wrapper.units);
        }
      });
  }

  removeDialog() {
    this.openRemoveDialog(this.dialog);
  }

  removeSelected() {
    this.selection.selected.forEach(pattern => {
      this.shiftPatternService.remove(pattern.id)
        .subscribe(res => {
          this.removeRow(pattern);
          this.notificationsService
            .success('Success',
              `Shift pattern "${pattern.name}" was successfully deleted`);
        });
    });
  }

  private createOrUpdatePattern(pattern: ShiftPattern, units: PatternUnit[]) {
    if (pattern.id) {
      this.shiftPatternService.update(pattern)
        .subscribe(res => {
          this.createOrUpdateUnit(units);
        });
    } else {
      this.shiftPatternService.create(pattern)
        .subscribe(res => {
          pattern.id = res;

          this.addRow(pattern);
          this.patternUnits[pattern.id] = [];

          units.forEach(unit => unit.patternId = pattern.id);
          this.createOrUpdateUnit(units);
        });
    }
  }

  private createOrUpdateUnit(units: PatternUnit[]) {
    if (!units) {
      return;
    }

    units.forEach(unit => {
      if (unit.id) {
        this.patternUnitService.update(unit).subscribe(res => console.log(res));
      } else {
        this.patternUnitService.create(unit).subscribe(res => {
          unit.id = res;
          this.patternUnits[unit.patternId].push(unit);
        });
      }
    });
  }

}
