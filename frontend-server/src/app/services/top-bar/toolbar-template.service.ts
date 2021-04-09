import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ToolbarTemplateService {

  private subject: Subject<any> = new Subject<any>();

  onTemplateChanged(): Observable<any> {
    return this.subject.asObservable();
  }

  changeTemplate(template: any) {
    this.subject.next(template);
  }

}
