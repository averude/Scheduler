import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ClearSelectionService {
  private subject: Subject<void> = new Subject();

  clearSelection() {
    this.subject.next();
  }

  onClearSelection(): Observable<void> {
    return this.subject.asObservable();
  }
}
