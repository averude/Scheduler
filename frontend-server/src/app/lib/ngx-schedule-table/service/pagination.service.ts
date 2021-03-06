import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { ClearableBehaviorSubject } from "../../../shared/paginators/clearable-behavior-subject";

@Injectable()
export class PaginationService {
  private subject: ClearableBehaviorSubject<any> = new ClearableBehaviorSubject();

  change(value: any) {
    this.subject.next(value);
  }

  get onValueChange(): Observable<any> {
    return this.subject.asObservable()
      .pipe(filter(value => !!value));
  }

  clearStoredValue() {
    this.subject.clearValue();
  }
}
