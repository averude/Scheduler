import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { DATE_FORMAT } from "../util/utils";

@Component({
  selector: 'app-avr-entity-generation-dialog',
  templateUrl: './avr-entity-generation-dialog.component.html',
  styleUrls: ['./avr-entity-generation-dialog.component.css'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}]
})
export class AvrEntityGenerationDialogComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['select', 'shift', 'offset', 'dateRange'];
  selection = new SelectionModel<any>(true, []);

  constructor(private dialogRef: MatDialogRef<any>,
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

  /** The label for the checkbox on the passed rowData */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
