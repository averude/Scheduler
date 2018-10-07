import {Component, OnInit} from '@angular/core';
import {Position} from '../../../model/position';
import {PositionService} from '../../../services/position.service';

@Component({
  selector: '[app-add-position]',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {

  newPosition: Position = new Position();

  constructor(private positionService: PositionService) { }

  ngOnInit() {
  }

  addPosition() {
    this.newPosition.departmentId = 1; // temporary
    this.positionService.addPosition(this.newPosition);
    this.clearModel();
  }

  clearModel() {
    this.newPosition = new Position();
  }
}
