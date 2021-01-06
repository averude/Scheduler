import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class TableStateService {

  private showSumColumnsSubject:  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private cellStateSubject:       BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private editableGroupsSubject:  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private headerCellClick:        Subject<any> = new Subject();

  constructor() { }

  showSumColumns(show: boolean) {
    this.showSumColumnsSubject.next(show);
  }

  get isSumColumnShown(): Observable<boolean> {
    return this.showSumColumnsSubject.asObservable();
  }

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

  resetEditableState() {
    this.editableGroupsSubject.next(false);
  }

  clickHeaderCell(value: any) {
    this.headerCellClick.next(value);
  }

  onHeaderCellClick(): Observable<any> {
    return this.headerCellClick.asObservable();
  }
}
