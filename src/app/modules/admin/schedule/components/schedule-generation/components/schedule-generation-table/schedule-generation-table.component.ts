import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material";
import { ShiftService } from "../../../../../../../services/shift.service";
import { ScheduleService } from "../../../../../../../services/schedule.service";
import { dateToISOString } from "../../../../../../../shared/utils/utils";
import { ShiftGenerationUnit } from "../../../../../../../model/ui/shift-generation-unit";

@Component({
  selector: 'app-schedule-generation-table',
  templateUrl: './schedule-generation-table.component.html',
  styleUrls: ['./schedule-generation-table.component.css']
})
export class ScheduleGenerationTableComponent implements OnInit {

  @Input() dataSource: MatTableDataSource<ShiftGenerationUnit>;

  displayedColumns = ['select', 'shift', 'offset', 'dateFrom', 'dateTo'];
  selection = new SelectionModel<ShiftGenerationUnit>(true, []);

  constructor(private shiftService: ShiftService,
              private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.shiftService.getAll()
      .subscribe(shifts => {
        const data: ShiftGenerationUnit[] = [];
        shifts.forEach(shift => data.push({
          shiftId: shift.id,
          shiftName: shift.name,
          offset: 0,
          from: new Date(new Date().getUTCFullYear(), 0, 1),
          to: new Date(new Date().getUTCFullYear(), 11, 31)
        }));
        this.dataSource.data = data
      });
  }

  generate() {
    let selected = this.selection.selected;
    if (selected.length > 0) {
      selected.forEach(unit => this.scheduleService
        .generate(unit.shiftId, dateToISOString(unit.from), dateToISOString(unit.to), unit.offset)
        .subscribe(res => console.log(res)));
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
