import { OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { RemoveDialogComponent } from "../remove-dialog/remove-dialog.component";
import { NotificationsService } from "angular2-notifications";
import { IdEntity } from "../../../model/interface/id-entity";
import { ComponentType } from "@angular/cdk/portal";
import { CUDService } from "../../../http-services/interface/cud-service";
import { IByAuthService } from "../../../http-services/interface/i-by-auth.service";

export abstract class TableBaseComponent<T extends IdEntity> implements OnInit, OnDestroy {

  dataSource  = new MatTableDataSource<T>([]);
  selection   = new SelectionModel<T>(true, []);

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  protected constructor(private matDialog: MatDialog,
                        protected crudService: CUDService<T>,
                        protected notification: NotificationsService) { }

  ngOnInit(): void {
    this.initDataSourceSort();
    this.initDataSourceValues();
  }

  ngOnDestroy(): void {
  }

  initDataSourceSort() {
    this.dataSource.sort = this.sort;
  }

  initDataSourceValues() {
    let service = this.crudService as unknown as IByAuthService<T>;
    if (service.getAll) {
      service.getAll()
        .subscribe(values => this.dataSource.data = values);
    }
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

  abstract openDialog(t: T);

  openAddOrEditDialog(t: T,
                      data: any,
                      component: ComponentType<any> | TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    let dialogRef = this.matDialog.open(component, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(this.addOrEditDialogAfterCloseFunction(t));
  }

  addOrEditDialogAfterCloseFunction(oldValue: T): (value: any) => void {
    return value => {
      if (!value) {
        return;
      }
      if (value.id) {
        this.crudService.update(value)
          .subscribe(this.onUpdated(value, oldValue));
      } else {
        this.crudService.create(value)
          .subscribe(this.onCreated(value));
      }
    };
  }

  onUpdated(value: T, oldValue: T): (value: any) => void {
    return res => {
      this.updateRow(value, oldValue);
      this.notification
        .success(
          'Updated',
          `Entity was successfully updated`);
    }
  }

  onCreated(value: T): (value: any) => void {
    return res => {
      value.id = res;
      this.addRow(value);
      this.notification
        .success(
          'Created',
          `Entity was successfully created`)
    }
  }

  removeDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfSelected: this.selection.selected.length
    };

    let dialogRef = this.matDialog.open(RemoveDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(answer => {
        if (answer) {
          this.removeSelected();
          this.selection.clear();
        }
      });
  }

  removeSelected() {
    this.selection.selected.forEach(value => this.removeEntity(value));
  }

  removeEntity(entity: T): void {
    this.crudService.delete(entity.id)
      .subscribe(res => {
        this.removeRow(entity);
        this.notification.success(
          'Deleted',
          'Selected values was successfully deleted'
        );
      });
  }

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

  /** The label for the checkbox on the passed rowData */
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
