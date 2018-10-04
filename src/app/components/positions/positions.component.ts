import { Component, OnInit } from '@angular/core';
import { Position } from '../../model/position';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  departmentId = 1;
  positions: Position[];

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.positionService.getPositions(this.departmentId)
      .subscribe(positions => this.positions = positions);
  }

  getQuantity(positionId: number): number {
    return 0;
  }

  addPosition(position: Position) {
    position.departmentId = this.departmentId;
    this.positionService.addPosition(position);
  }

  updatePosition(position: Position) {
    this.positionService.updatePosition(position);
  }

  removePosition(position: Position) {
    this.positionService.removePosition(position);
  }

}
