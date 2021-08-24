import { ClearableBehaviorSubject } from "./clearable-behavior-subject";
import { Observable } from "rxjs";
import { debounceTime, filter, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class PaginationService {
  private subject: ClearableBehaviorSubject<any> = new ClearableBehaviorSubject();

  change(value: any) {
    // DEBUG
    console.log("Input: ")
    console.log(value);
    this.subject.next(value);
  }

  get onValueChange(): Observable<any> {
    return this.subject.asObservable()
      .pipe(
        filter(value => !!value),
        debounceTime(400),
        // DEBUG
        tap(value => {
          console.log("Output: ");
          console.log(value);
        })
      );
  }

  clearStoredValue() {
    this.subject.clearValue();
  }
}
