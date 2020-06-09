import { Component, ContentChild, ContentChildren, OnInit, QueryList, TemplateRef } from '@angular/core';
import { AvrSideBarContent, AvrSideBarItemDef } from "./avr-side-bar-item";

@Component({
  selector: 'avr-side-bar',
  templateUrl: './avr-side-bar.component.html',
  styleUrls: ['./avr-side-bar.component.css']
})
export class AvrSideBarComponent implements OnInit {

  @ContentChildren(AvrSideBarItemDef, {read: TemplateRef})
  sideBarItems: QueryList<AvrSideBarItemDef>;

  @ContentChild(AvrSideBarContent, {read: TemplateRef, static: false})
  sideBarContent: TemplateRef<any>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
