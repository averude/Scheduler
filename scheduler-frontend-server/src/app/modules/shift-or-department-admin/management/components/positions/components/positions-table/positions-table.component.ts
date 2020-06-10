import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Position } from "../../../../../../../model/position";
import { NotificationsService } from "angular2-notifications";
import { PositionService } from "../../../../../../../services/http/position.service";
import { PositionDialogComponent } from "../position-dialog/position-dialog.component";
import { StatisticsService } from "../../../../../../../services/http/statistics.service";
import { CountDTO } from "../../../../../../../model/dto/count-dto";
import { TableBaseComponent } from "../../../../../../../shared/abstract-components/table-base/table-base.component";

@Component({
  selector: 'app-mat-positions-table',
  templateUrl: './positions-table.component.html',
  styleUrls: [
    '../../../../../../../shared/common/table.common.css',
    './positions-table.component.css'
  ]
})
export class PositionsTableComponent extends TableBaseComponent<Position> {
  displayedColumns = ['select', 'name', 'shortName', 'quantity', 'control'];

  employeesCount: CountDTO[];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private positionService: PositionService,
              private statisticsService: StatisticsService) {
    super(dialog, positionService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter);
    });
    this.statisticsService.getNumberOfEmployeesInPositions()
      .subscribe(counts => this.employeesCount = counts);
  }

  openDialog(position: Position) {
    const data = {
      position: position
    };

    this.openAddOrEditDialog(position, data, PositionDialogComponent);
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
