import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class TableRenderer {

  //table
  private tableSubject:               Subject<void>   = new Subject();
  //groups
  private renderRowGroupSubject:      Subject<number> = new Subject();
  private renderAllRowGroupsSubject:  Subject<void>   = new Subject();
  // rows
  private renderRowSubject:           Subject<number> = new Subject();
  private renderAllRowsSubject:       Subject<void> = new Subject();

  renderTable() {
    this.tableSubject.next();
  }

  get onTableRender(): Observable<void> {
    return this.tableSubject.asObservable();
  }

  renderRow(rowEntityId: number) {
    this.renderRowSubject.next(rowEntityId);
  }

  get onRenderRow(): Observable<number> {
    return this.renderRowSubject.asObservable();
  }

  renderAllRows() {
    this.renderAllRowsSubject.next();
  }

  get onRenderAllRows(): Observable<void> {
    return this.renderAllRowsSubject.asObservable();
  }

  renderRowGroup(groupId: number) {
    this.renderRowGroupSubject.next(groupId);
  }

  get onRenderRowGroup(): Observable<number> {
    return this.renderRowGroupSubject.asObservable();
  }

  renderAllRowGroups() {
    this.renderAllRowGroupsSubject.next();
  }

  get onRenderAllRowGroups() {
    return this.renderAllRowGroupsSubject.asObservable();
  }
}
