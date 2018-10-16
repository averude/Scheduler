import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Position} from '../../../model/position';

@Component({
  selector: '[app-add-position]',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {

  newPosition: Position = new Position();
  @Output()
  positionCreated: EventEmitter<Position> = new EventEmitter<Position>();

  constructor() { }

  ngOnInit() {
  }

  addPosition() {
    this.newPosition.departmentId = 1; // temporary
    this.positionCreated.emit(this.newPosition);
    this.clearModel();
  }

  clearModel() {
    this.newPosition = new Position();
  }
}
