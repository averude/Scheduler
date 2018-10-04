import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Shift} from '../model/shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor() { }

  getShifts(): Observable<Shift[]> {
    return of([{id: 1, name: 'Everyday'}, {id: 2, name: '1 shift'}]);
  }

  addShift() {
    //
  }

  updateShift() {
    //
  }

  removeShift() {
    //
  }
}
