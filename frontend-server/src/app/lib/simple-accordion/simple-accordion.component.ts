import { Component, Input, OnInit } from '@angular/core';
import { CdkAccordionItem } from "@angular/cdk/accordion";
import { matExpansionAnimations, MatExpansionPanelState } from "@angular/material/expansion";

@Component({
  selector: 'app-simple-accordion',
  templateUrl: './simple-accordion.component.html',
  styleUrls: ['./simple-accordion.component.css'],
  animations: [matExpansionAnimations.bodyExpansion],
})
export class SimpleAccordionComponent extends CdkAccordionItem implements OnInit {

  @Input() name;
  @Input() content;

  getExpandedState(): MatExpansionPanelState {
    return this.expanded ? 'expanded' : 'collapsed';
  }

  ngOnInit(): void {
  }

}
