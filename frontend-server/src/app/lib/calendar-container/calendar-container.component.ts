import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { ContentDef, HeaderDef } from "./directives";

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarContainerComponent implements OnInit {

  @ContentChild(HeaderDef, {read: TemplateRef})
  header: TemplateRef<any>;

  @ContentChild(ContentDef, {read: TemplateRef})
  content: TemplateRef<any>;

  @Input()
  proxyViewShown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
