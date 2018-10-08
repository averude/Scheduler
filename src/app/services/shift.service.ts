import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Shift} from '../model/shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor() { }

  findAll(): Observable<Shift[]> {
    return of([{id: 1, name: 'Everyday'}, {id: 2, name: '1 shift'}]);
  }

  create() {
    //
  }

  update() {
    //
  }

  remove() {
    //
  }
}
