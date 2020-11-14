import { Component, OnInit } from '@angular/core';
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { Shift } from "../../../../../../../model/shift";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { ShiftService } from "../../../../../../../services/http/shift.service";
import { ShiftPattern } from "../../../../../../../model/shift-pattern";
import { ShiftPatternService } from "../../../../../../../services/http/shift-pattern.service";
import { ShiftDialogComponent } from "../shift-dialog/shift-dialog.component";

@Component({
  selector: 'app-mat-shifts-table',
  templateUrl: './shifts-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css','./shifts-table.component.css']
})
export class ShiftsTableComponent extends TableBaseComponent<Shift> implements OnInit {
  displayedColumns = ['select', 'name', 'pattern', 'control'];

  patterns: ShiftPattern[] = [];

  constructor(private dialog: MatDialog,
              private shiftService: ShiftService,
              private shiftPatternService: ShiftPatternService,
              private notificationsService: NotificationsService) {
    super(dialog, shiftService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter) ||
        data.shiftPattern.name.toLowerCase().includes(filter)
    });
    this.shiftPatternService.getAll()
      .subscribe(patterns => this.patterns = patterns);
  }

  openDialog(shift: Shift) {
    const data = {
      shift: shift,
      patterns: this.patterns
    };

    this.openAddOrEditDialog(shift, data, ShiftDialogComponent);
  }

  getPatternName(patternId: number): string {
    let pattern = this.patterns.find(value => value.id === patternId);
    if (pattern) {
      return pattern.name;
    } else {
      return '-';
    }
  }
}
