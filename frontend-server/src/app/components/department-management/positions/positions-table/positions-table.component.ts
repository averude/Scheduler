import { Position } from "../../../../model/position";
import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { PositionDialogComponent } from "../position-dialog/position-dialog.component";
import { ActivatedRoute } from "@angular/router";
import { HasDepartmentTableComponent } from "../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { PositionService } from "../../../../services/http/position.service";

@Component({
  selector: 'app-mat-positions-table',
  templateUrl: './positions-table.component.html',
  styleUrls: [
    '../../../../shared/common/table.common.css',
    './positions-table.component.css'
  ]
})
export class PositionsTableComponent extends HasDepartmentTableComponent<Position> {
  displayedColumns = ['select', 'name', 'shortName', 'control'];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private positionService: PositionService,
              private activatedRoute: ActivatedRoute) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.departmentId),
      positionService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataSource.filterPredicate = ((data, filter) => {
      return data.name.toLowerCase().includes(filter);
    });
  }

  openDialog(position: Position) {
    const data = {
      position: position
    };

    this.openAddOrEditDialog(position, data, PositionDialogComponent);
  }
}
