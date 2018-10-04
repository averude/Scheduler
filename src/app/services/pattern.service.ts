import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Pattern} from '../model/pattern';
import {PATTERNS} from '../datasource/mock-patterns';
import {delay} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  patterns: Pattern[] = PATTERNS;

  constructor() { }

  getPatterns(): Observable<Pattern[]> {
    return of(this.patterns)
      .pipe(delay(500));
  }
}
