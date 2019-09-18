import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from "@angular/material";
import { ShiftGenerationUnit } from "../../../../../../../model/ui/shift-generation-unit";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: 'app-schedule-generation-dialog',
  templateUrl: './schedule-generation-dialog.component.html',
  styleUrls: ['./schedule-generation-dialog.component.css']
})
export class ScheduleGenerationDialogComponent implements OnInit {

  dataSource = new MatTableDataSource<ShiftGenerationUnit>();
  displayedColumns = ['select', 'shift', 'offset', 'dateFrom', 'dateTo'];
  selection = new SelectionModel<ShiftGenerationUnit>(true, []);

  constructor(private dialogRef: MatDialogRef<ScheduleGenerationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.dataSource.data = data;
  }

  ngOnInit() {
  }

  generate() {
    let selected = this.selection.selected;
    if (selected.length > 0) {
      this.dialogRef.close(selected);
    }
  }

  close() {
    this.dialogRef.close();
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
