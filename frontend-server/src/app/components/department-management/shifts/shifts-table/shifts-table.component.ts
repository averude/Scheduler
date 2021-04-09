import { Component, OnInit } from '@angular/core';
import { HasDepartmentTableComponent } from "../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { Shift } from "../../../../model/shift";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { ShiftService } from "../../../../services/http/shift.service";
import { ShiftPattern } from "../../../../model/shift-pattern";
import { ShiftPatternService } from "../../../../services/http/shift-pattern.service";
import { ShiftDialogComponent } from "../shift-dialog/shift-dialog.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-mat-shifts-table',
  templateUrl: './shifts-table.component.html',
  styleUrls: ['../../../../shared/common/table.common.css','./shifts-table.component.css']
})
export class ShiftsTableComponent extends HasDepartmentTableComponent<Shift> implements OnInit {
  displayedColumns = ['select', 'name', 'pattern', 'control'];

  patterns: ShiftPattern[] = [];

  constructor(private dialog: MatDialog,
              private shiftService: ShiftService,
              private shiftPatternService: ShiftPatternService,
              private notificationsService: NotificationsService,
              private activatedRoute: ActivatedRoute) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.departmentId),
      shiftService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter) ||
        this.getPatternName(data.shiftPatternId).toLowerCase().includes(filter)
    });
    this.shiftPatternService.getAllByDepartmentId(this.departmentId)
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
