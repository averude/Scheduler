import { ClearableBehaviorSubject } from "./clearable-behavior-subject";
import { Observable } from "rxjs";
import { debounceTime, filter } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class PaginationService {
  private subject: ClearableBehaviorSubject<any> = new ClearableBehaviorSubject();

  change(value: any) {
    this.subject.next(value);
  }

  get onValueChange(): Observable<any> {
    return this.subject.asObservable()
      .pipe(
        filter(value => !!value),
        debounceTime(400)
      );
  }

  clearStoredValue() {
    this.subject.clearValue();
  }
}
