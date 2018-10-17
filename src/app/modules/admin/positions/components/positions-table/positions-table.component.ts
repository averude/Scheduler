import { Component, OnInit } from '@angular/core';
import { Position } from '../../../../../model/position';
import { PositionService } from '../../../../../services/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions-table.component.html',
  styleUrls: ['./positions-table.component.css']
})
export class PositionsTableComponent implements OnInit {

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

  createPosition(position: Position) {
    this.positionService.create(this.departmentId, position)
      .subscribe(res => {
        position.id = res;
        this.positions.push(position);
      }, err => console.log(err));
  }

  updatePosition(position: Position) {
    this.positionService.update(this.departmentId, position.id, position)
      .subscribe(res => console.log(res), err => console.log(err));
  }

  removePosition(position: Position) {
    this.positionService.remove(this.departmentId, position.id)
      .subscribe(res => {
        console.log(res);
        this.positions = this.positions
          .filter(value => value !== position);
      }, err => console.log(err));
  }
}
