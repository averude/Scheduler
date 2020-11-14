import { Component, ContentChild, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { ToolBarContentDef, TopBarContentDef } from "./avr-top-bar-items";

@Component({
  selector: 'avr-top-bar',
  templateUrl: './avr-top-bar.component.html',
  styleUrls: ['./avr-top-bar.component.css']
})
export class AvrTopBarComponent implements OnInit {

  @ContentChild(TopBarContentDef, { read: TemplateRef })
  topBarContent: TemplateRef<any>;

  @ContentChild(ToolBarContentDef, { read: ToolBarContentDef })
  toolBarContent: ToolBarContentDef;

  @Output() onLogout: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  logout() {
    this.onLogout.emit();
  }
}
