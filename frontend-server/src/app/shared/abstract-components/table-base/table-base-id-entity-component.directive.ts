import { Directive, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { RemoveDialogComponent } from "../remove-dialog/remove-dialog.component";
import { NotificationsService } from "angular2-notifications";
import { IdEntity } from "../../../model/interface/id-entity";
import { ComponentType } from "@angular/cdk/portal";
import { CUDService } from "../../../services/http/interface/cud-service";
import { HasDepartmentIdService } from "../../../services/http/interface/has-department-id.service";
import { HasEnterpriseIdService } from "../../../services/http/interface/has-enterprise-id.service";
import { ACrudService } from "../../../services/http/abstract-service/a-crud-service";

@Directive()
export class TableBaseComponent<T> implements OnInit, OnDestroy {

  dataSource  = new MatTableDataSource<T>([]);
  selection   = new SelectionModel<T>(true, []);

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(protected crudService: CUDService<T>) {}

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
    let service = this.crudService as unknown as ACrudService<T>;
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

@Directive()
export abstract class TableBaseIdEntityComponent<T extends IdEntity> extends TableBaseComponent<T> {

  protected constructor(protected matDialog: MatDialog,
                        crudService: CUDService<T>,
                        protected notification: NotificationsService) {
    super(crudService);
  }

  abstract openDialog(t: T);

  openAddOrEditDialog(t: T,
                      data: any,
                      component: ComponentType<any> | TemplateRef<any>,
                      decideFunction?: (value) => boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    let dialogRef = this.matDialog.open(component, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(this.addOrEditDialogAfterCloseFunction(t, decideFunction));
  }

  addOrEditDialogAfterCloseFunction(oldValue: T,
                                    decideFunction?: (value) => boolean): (value: any) => void {
    return value => {
      if (!value) {
        return;
      }
      if (value.id || (decideFunction && decideFunction(value))) {
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
      this.updateRow(res, oldValue);
      this.notification
        .success(
          'Updated',
          `Entity was successfully updated`);
    }
  }

  onCreated(value: T): (value: any) => void {
    return res => {
      this.addRow(res);
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
}

export abstract class HasDepartmentTableComponent<T extends IdEntity> extends TableBaseIdEntityComponent<T> {

  constructor(matDialog: MatDialog,
              protected departmentId: number,
              private hasDepartmentIdService: HasDepartmentIdService<T> & CUDService<T>,
              notification: NotificationsService) {
    super(matDialog, hasDepartmentIdService, notification);
    if (!departmentId) {
      throw Error('No department ID provided');
    }
  }

  initDataSourceValues() {
    this.hasDepartmentIdService.getAllByDepartmentId(this.departmentId)
      .subscribe(values => this.dataSource.data = values);
  }

  openAddOrEditDialog(t: T,
                      data: any,
                      component: ComponentType<any> | TemplateRef<any>,
                      decideFunction?: (value) => boolean) {
    data.departmentId = this.departmentId;
    super.openAddOrEditDialog(t, data, component, decideFunction);
  }
}

export abstract class HasEnterpriseTableComponent<T extends IdEntity> extends TableBaseIdEntityComponent<T> {

  constructor(matDialog: MatDialog,
              protected enterpriseId: number,
              private hasDepartmentIdService: HasEnterpriseIdService<T> & CUDService<T>,
              notification: NotificationsService) {
    super(matDialog, hasDepartmentIdService, notification);
    if (!enterpriseId) {
      throw Error('No enterprise ID provided');
    }
  }

  initDataSourceValues() {
    this.hasDepartmentIdService.getAllByEnterpriseId(this.enterpriseId)
      .subscribe(values => this.dataSource.data = values);
  }

  openAddOrEditDialog(t: T,
                      data: any,
                      component: ComponentType<any> | TemplateRef<any>,
                      decideFunction?: (value) => boolean) {
    data.enterpriseId = this.enterpriseId;
    super.openAddOrEditDialog(t, data, component, decideFunction);
  }
}
