import { OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { RemoveDialogComponent } from "../remove-dialog/remove-dialog.component";

export abstract class TableBaseComponent<T> implements OnInit {

  dataSource  = new MatTableDataSource<T>([]);
  selection   = new SelectionModel<T>(true, []);

  @ViewChild(MatSort)
  sort: MatSort;

  protected constructor() { }

  ngOnInit(): void {
  }

  initDataSource() {
    this.dataSource.sort = this.sort;
  }

  addRow(object: T) {
    let data = this.dataSource.data;
    data.push(object);
    this.dataSource.data = data;
  }

  updateRow(newObject: T, oldObject: T) {
    let data = this.dataSource.data;
    let index = data.indexOf(oldObject);
    data[index] = newObject;
    this.dataSource.data = data;
  }

  removeRow(object: T) {
    let data = this.dataSource.data;
    let index = data.indexOf(object);
    data.splice(index, 1);
    this.dataSource.data = data;
  }

  openRemoveDialog(dialog: MatDialog) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfSelected: this.selection.selected.length
    };

    let dialogRef = dialog.open(RemoveDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(answer => {
        if (answer) {
          this.removeSelected();
          this.selection.clear();
        }
      });
  }

  abstract openDialog(t: T);

  abstract removeDialog();

  abstract removeSelected();

  /** Whether the number of selected elements matches the total number of rows. */
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
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.toString() + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
