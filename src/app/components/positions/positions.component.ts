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
    this.positionService.getByDepartmentId(this.departmentId)
      .subscribe(positions => this.positions = positions);
  }

  getQuantity(positionId: number): number {
    return 0;
  }

  updatePosition(position: Position) {
    this.positionService.update(position);
  }

  removePosition(position: Position) {
    this.positionService.remove(position);
  }
}
