import { Component, OnInit } from '@angular/core';
import { Position } from '../../../../../../../model/position';
import { PositionService } from '../../../../../../../services/position.service';
import { NotificationsService } from "angular2-notifications";
import { CountDTO } from "../../../../../../../model/count-dto";
import { StatisticsService } from "../../../../../../../services/statistics.service";

@Component({
  selector: 'app-positions',
  templateUrl: './positions-table.component.html',
  styleUrls: ['./positions-table.component.css']
})
export class PositionsTableComponent implements OnInit {

  positions: Position[];
  employeesCount: CountDTO[];

  constructor(private notificationService: NotificationsService,
              private positionService: PositionService,
              private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.positionService.getAll()
      .subscribe(positions => this.positions = positions);
    this.statisticsService.getNumberOfEmployeesInPositions()
      .subscribe(countDTOs => this.employeesCount = countDTOs);
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

  createPosition(position: Position) {
    this.positionService.create(position)
      .subscribe(res => {
        position.id = res;
        this.positions.push(position);
        this.notificationService.success(
          ' Created',
          `Position "${position.name}" was successfully created`
        );
      });
  }

  updatePosition(position: Position) {
    this.positionService.update(position)
      .subscribe(res => this.notificationService.success(
        'Updated',
        `Position "${position.name}" was successfully updated`
      ));
  }

  removePosition(position: Position) {
    this.positionService.remove(position.id)
      .subscribe(res => {
        this.positions = this.positions
          .filter(value => value !== position);
        this.notificationService.success(
          'Deleted',
          `Position "${position.name}" was successfully deleted`
        );
      });
  }
}
