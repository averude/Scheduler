import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class RowRendererService {
  private renderRowSubject:     Subject<number> = new Subject();
  private renderAllRowsSubject: Subject<void> = new Subject();

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
}
