import { Component } from '@angular/core';
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { ShiftPattern } from "../../../../../../../model/shift-pattern";
import { ShiftPatternService } from "../../../../../../../services/shift-pattern.service";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { map } from "rxjs/operators";
import { PatternUnitService } from "../../../../../../../services/pattern-unit.service";
import { DayTypeService } from "../../../../../../../services/daytype.service";
import { DayType } from "../../../../../../../model/daytype";
import { PatternDialogComponent, ShiftPatternWrapper } from "../pattern-dialog/pattern-dialog.component";
import { PatternUnit } from "../../../../../../../model/pattern-unit";

@Component({
  selector: 'app-patterns-table',
  templateUrl: './patterns-table.component.html',
  styleUrls: [
    '../../../../../../../shared/common/table.common.css',
    './patterns-table.component.css'
  ]
})
export class PatternsTableComponent extends TableBaseComponent<ShiftPattern> {

  displayedColumns = ['select', 'name', 'pattern', 'control'];

  patternUnits: any = [];
  dayTypes: DayType[];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private dayTypeService: DayTypeService,
              private shiftPatternService: ShiftPatternService,
              private patternUnitService: PatternUnitService) {
    super(dialog, shiftPatternService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dayTypeService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes);
  }

  initDataSourceValues() {
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
  }

  openDialog(shiftPattern: ShiftPattern) {
    const data = {
      pattern: shiftPattern,
      units: shiftPattern ? this.patternUnits[shiftPattern.id] : undefined,
      dayTypes: this.dayTypes
    };

    this.openAddOrEditDialog(shiftPattern, data, PatternDialogComponent);
  }

  addOrEditDialogAfterCloseFunction(oldValue: ShiftPattern): (value: any) => void {
    return (wrapper: ShiftPatternWrapper) => {
      if (!wrapper) {
        return;
      }

      if (wrapper.pattern) {
        this.createOrUpdatePattern(wrapper.pattern, wrapper.units);
      }
    };
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
