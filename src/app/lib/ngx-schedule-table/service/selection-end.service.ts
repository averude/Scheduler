import { Observable, Subject } from "rxjs";
import { SelectionData } from "../model/selection-data";
import { Injectable } from "@angular/core";
import { RowData } from "../model/data/row-data";
import { CellData } from "../model/data/cell-data";

@Injectable()
export class SelectionEndService {
  private subject: Subject<SelectionData> = new Subject();

  endSelection($event: MouseEvent,
               rowData: RowData,
               selectedCells: CellData[]) {
    this.subject.next({
      event: $event,
      rowData: rowData,
      selectedCells: selectedCells
    });
  }

  get onSelectionEnd(): Observable<SelectionData> {
    return this.subject.asObservable();
  }
}
