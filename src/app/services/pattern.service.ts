import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Pattern} from '../model/pattern';
import {PATTERNS} from '../datasource/mock-patterns';
import {delay} from 'rxjs/internal/operators';
import {DayType} from '../model/daytype';
import {DAYTYPES} from '../datasource/mock-daytypes';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  patterns: Pattern[] = PATTERNS;
  daytypes: DayType[] = DAYTYPES;

  constructor() { }

  getPatterns(): Observable<Pattern[]> {
    return of(this.patterns)
      .pipe(delay(500));
  }

  getDayTypes(patternId: number): Observable<DayType[]> {
    return of(this.daytypes
        .filter(value => value.patternId === patternId))
      .pipe(delay(500));
  }
}
