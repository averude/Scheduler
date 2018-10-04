import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Position} from '../../../model/position';

@Component({
  selector: '[app-add-position]',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {

  model: Position = new Position();

  constructor() { }

  @Output()
  newPosition: EventEmitter<Position> = new EventEmitter<Position>();

  ngOnInit() {
  }

  addPosition() {
    this.newPosition.emit(this.model);
    this.clearModel();
  }

  clearModel() {
    this.model = new Position();
  }

}
