import { Component, OnInit } from '@angular/core';
import { DayType } from "../../../../../../../model/daytype";
import { DayTypeService } from "../../../../../../../services/daytype.service";
import { NotificationsService } from "angular2-notifications";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { DayTypeDialogComponent } from "../daytype-dialog/daytype-dialog.component";
import { RemoveDialogComponent } from "../../../../../../../shared/abstract-components/remove-dialog/remove-dialog.component";

@Component({
  selector: 'app-mat-daytypes-table',
  templateUrl: './daytypes-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css','./daytypes-table.component.css']
})
export class DayTypesTableComponent extends TableBaseComponent<DayType> implements OnInit {
  displayedColumns = ['select', 'name', 'label', 'control'];

  constructor(private dialog: MatDialog,
              private dayTypeService: DayTypeService,
              private notificationsService: NotificationsService) {super();}

  ngOnInit() {
    this.initDataSource();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter)
    });
    this.dayTypeService.getAll()
      .subscribe(dayTypes => this.dataSource.data = dayTypes);
  }

  openDialog(dayType: DayType) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      dayType: dayType,
    };
    let dialogRef = this.dialog.open(DayTypeDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(value => {
        if (!value) {
          return;
        }
        if (value.id) {
          this.dayTypeService.update(value)
            .subscribe(res => {
              this.updateRow(value, dayType);
              this.notificationsService
                .success(
                  'Updated',
                  `Day type "${value.secondName}" was successfully updated`);
            });
        } else {
          this.dayTypeService.create(value)
            .subscribe(res => {
              value.id = res;
              this.addRow(value);
              this.notificationsService
                .success(
                  'Created',
                  `Day type "${value.secondName}" was successfully created`);
            });
        }
      });
  }

  removeDialog(){
    this.openRemoveDialog(this.dialog);
  }

  removeSelected() {
    this.selection.selected.forEach(dayType => {
      this.dayTypeService.delete(dayType.id)
        .subscribe(res => {
          this.removeRow(dayType);
          this.notificationsService.success(
            'Deleted',
            `Day type "${dayType.name}" was successfully deleted`
          );
        })
    });
  }
}
