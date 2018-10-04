import { Injectable } from '@angular/core';
import {Position} from '../model/position';
import {POSITIONS} from '../datasource/mock-positions';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  positions: Position[] = POSITIONS;

  constructor() { }

  getPositions(departmentId: number): Observable<Position[]> {
    return of(this.positions
      // .filter(value => value.departmentId === departmentId)
    ).pipe(delay(1000));
  }

  addPosition(position: Position) {
    position.id = this.positions
      .map(value => value.id)
      .reduce((prev, curr) => Math.max(prev, curr)) + 1;
    this.positions.push(position);
  }

  updatePosition(position: Position) {
    //
  }

  removePosition(position: Position) {
    this.positions.splice(this.findIndex(position), 1);
  }

  private findIndex(position: Position): number {
    return this.positions.indexOf(position);
  }
}
