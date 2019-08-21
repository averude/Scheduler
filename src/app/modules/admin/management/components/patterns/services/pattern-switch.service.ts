import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PatternSwitchService {
  private idSubject: Subject<number> = new Subject<number>();

  changePattern(patternId: number) {
    this.idSubject.next(patternId);
  }

  get patternId(): Observable<number> {
    return this.idSubject.asObservable();
  }
}
