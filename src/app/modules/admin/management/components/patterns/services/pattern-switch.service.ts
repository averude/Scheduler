import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PatternUnit } from '../../../../../../model/patternunit';

@Injectable()
export class PatternSwitchService {
  private unitsSubject: Subject<PatternUnit[]> = new Subject<PatternUnit[]>();
  private selectSubject: Subject<boolean> = new Subject<boolean>();

  changeUnits(units: PatternUnit[]) {
    this.unitsSubject.next(units);
  }

  get units(): Observable<PatternUnit[]> {
    return this.unitsSubject.asObservable();
  }

  changeSelected(selected: boolean) {
    this.selectSubject.next(selected);
  }

  get selected(): Observable<boolean> {
    return this.selectSubject.asObservable();
  }
}
