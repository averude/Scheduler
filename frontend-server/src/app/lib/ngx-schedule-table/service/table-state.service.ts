import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class TableStateService {
  private cellStateSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private editableGroupsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  nextCellStatus(status: number) {
    this.cellStateSubject.next(status);
  }

  get isCellShown(): Observable<number> {
    return this.cellStateSubject.asObservable();
  }

  changeEditableGroupsState(b: boolean) {
    this.editableGroupsSubject.next(b);
  }

  get editableGroupsState(): Observable<boolean> {
    return this.editableGroupsSubject.asObservable();
  }
}
