import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { RowCommand } from "../model/row-command";
import { debounceTime } from "rxjs/operators";

@Injectable()
export class TableRenderer {

  //table
  private tableSubject:               Subject<void>   = new Subject();
  //groups
  private renderRowGroupSubject:      Subject<number> = new Subject();
  private renderAllRowGroupsSubject:  Subject<void>   = new Subject();
  // rows
  private renderAllRowsSubject:       Subject<void> = new Subject();

  private rowCommandSubject:          Subject<RowCommand> = new Subject();

  onRowCommand(): Observable<RowCommand> {
    return this.rowCommandSubject.asObservable();
  }

  // TODO: Find solution for the case when the new row is
  //  added and it lose event fire. Possible solution is usage of BehaviourSubject
  //  but it fixes case when one row added.
  nextRowCommand(command: RowCommand) {
    this.rowCommandSubject.next(command);
  }

  renderTable() {
    this.tableSubject.next();
  }

  get onTableRender(): Observable<void> {
    return this.tableSubject.asObservable();
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
    return this.renderRowGroupSubject
      .asObservable()
      .pipe(debounceTime(50));
  }

  renderAllRowGroups() {
    this.renderAllRowGroupsSubject.next();
  }

  get onRenderAllRowGroups() {
    return this.renderAllRowGroupsSubject
      .asObservable()
      .pipe(debounceTime(50));
  }
}
