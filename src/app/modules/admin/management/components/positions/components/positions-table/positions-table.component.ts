import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Position } from "../../../../../../../model/position";
import { NotificationsService } from "angular2-notifications";
import { PositionService } from "../../../../../../../services/position.service";
import { PositionDialogComponent } from "../position-dialog/position-dialog.component";
import { StatisticsService } from "../../../../../../../services/statistics.service";
import { CountDTO } from "../../../../../../../model/count-dto";
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";
import { RemoveDialogComponent } from "../../../../../../../shared/abstract-components/remove-dialog/remove-dialog.component";

@Component({
  selector: 'app-mat-positions-table',
  templateUrl: './positions-table.component.html',
  styleUrls: ['../../../../../../../shared/common/table.common.css','./positions-table.component.css']
})
export class PositionsTableComponent extends TableBaseComponent<Position> implements OnInit {
  displayedColumns = ['select', 'name', 'quantity', 'control'];

  employeesCount: CountDTO[];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private positionService: PositionService,
              private statisticsService: StatisticsService) { super(); }

  ngOnInit() {
    this.initDataSource();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter);
    });
    this.positionService.getAll()
      .subscribe(positions => this.dataSource.data = positions);
    this.statisticsService.getNumberOfEmployeesInPositions()
      .subscribe(counts => this.employeesCount = counts);
  }

  openDialog(position: Position) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      position: position
    };

    let dialogRef = this.dialog.open(PositionDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(value => {
        if (!value) {
          return;
        }
        if (value.id) {
          this.positionService.update(value)
            .subscribe(res => {
              this.updateRow(value, position);
              this.notificationsService
                .success(
                  'Updated',
                  `Position "${value.name}" was successfully updated`);
            });
        } else {
          this.positionService.create(value)
            .subscribe(res => {
              value.id = res;
              this.addRow(value);
              this.notificationsService
                .success(
                  'Created',
                  `Position "${value.name}" was successfully created`)
            });
        }
      })
  }

  removeDialog() {
    this.openRemoveDialog(this.dialog);
  }

  removeSelected() {
    this.selection.selected.forEach(position => {
      this.positionService.remove(position.id)
        .subscribe(res => {
          this.removeRow(position);
          this.notificationsService
            .success(
              'Deleted',
              `Position "${position.name}" was successfully deleted`)
        })
    });
  }

  getQuantity(positionId: number): number|string {
    if (this.employeesCount) {
      let dto = this.employeesCount
        .find(countDTO => countDTO.id === positionId);
      return dto ? dto.count : '-';
    } else {
      return '-';
    }
  }
}
