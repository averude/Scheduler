import { Component, OnInit } from '@angular/core';
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { Shift } from "../../../../../../../model/shift";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { ShiftService } from "../../../../../../../services/shift.service";
import { ShiftPattern } from "../../../../../../../model/shiftpattern";
import { ShiftPatternService } from "../../../../../../../services/shiftpattern.service";
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
              private notificationsService: NotificationsService) {super();}

  ngOnInit() {
    this.initDataSource();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter) ||
        this.getPatternName(data.patternId).toLowerCase().includes(filter)
    });
    this.shiftService.getAll()
      .subscribe(shifts => this.dataSource.data = shifts);
    this.shiftPatternService.getAll()
      .subscribe(patterns => this.patterns = patterns);
  }

  openDialog(shift: Shift) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      shift: shift,
      patterns: this.patterns
    };

    let dialogRef = this.dialog.open(ShiftDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(value => {
        if (!value) {
          return;
        }
        if (value.id) {
          this.shiftService.update(value)
            .subscribe(res => {
              this.updateRow(value, shift);
              this.notificationsService
                .success('Updated',
                  `Shift "${value.name}" was successfully updated`)
            });
        } else {
          this.shiftService.create(value)
            .subscribe(res => {
              value.id = res;
              this.addRow(value);
              this.notificationsService
                .success('Created',
                  `Shift "${value.name}" was successfully created`);
            });
        }
      });
  }

  removeDialog() {
    this.openRemoveDialog(this.dialog);
  }

  removeSelected() {
    this.selection.selected.forEach(shift => {
      this.shiftService.remove(shift.id)
        .subscribe(res => {
          this.removeRow(shift);
          this.notificationsService
            .success('Deleted',
              `Shift "${shift.name}" was successfully deleted`);
        });
    });
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
