import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { PatternUnit } from "../../../../../../model/pattern-unit";

@Injectable()
export class UnitControlService {

  private up:   Subject<PatternUnit> = new Subject<PatternUnit>();
  private down: Subject<PatternUnit> = new Subject<PatternUnit>();
  private del:  Subject<PatternUnit> = new Subject<PatternUnit>();

  constructor() { }

  moveUp(patternUnit: PatternUnit) {
    this.up.next(patternUnit);
  }

  moveDown(patternUnit: PatternUnit) {
    this.down.next(patternUnit);
  }

  delete(patternUnit: PatternUnit) {
    this.del.next(patternUnit);
  }

  getMoveUp(): Observable<PatternUnit> {
    return this.up.asObservable();
  }

  getMoveDown(): Observable<PatternUnit> {
    return this.down.asObservable();
  }

  getDelete(): Observable<PatternUnit> {
    return this.del.asObservable();
  }
}
