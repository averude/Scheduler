import { Observable, Subject } from "rxjs";
import { SelectionData } from "../model/selection-data";
import { Injectable } from "@angular/core";
import { Row } from "../model/data/row";
import { Cell } from "../model/data/cell";

@Injectable()
export class SelectionEndService {
  private subject: Subject<SelectionData> = new Subject();

  endSelection($event: MouseEvent,
               row: Row,
               selectedCells: Cell[]) {
    this.subject.next({
      event: $event,
      row: row,
      selectedCells: selectedCells
    });
  }

  get onSelectionEnd(): Observable<SelectionData> {
    return this.subject.asObservable();
  }
}
