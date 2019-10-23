import { Component, Input, OnInit } from '@angular/core';
import { DayType } from "../../../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../../../model/day-type-group";

@Component({
  selector: 'app-context-menu-daytype-item',
  templateUrl: './context-menu-daytype-item.component.html',
  styleUrls: ['./context-menu-daytype-item.component.css']
})
export class ContextMenuDaytypeItemComponent implements OnInit {

  @Input() dayType: DayType;
  @Input() dayTypeGroups: DayTypeGroup[];

  constructor() { }

  ngOnInit() {
  }

  getDayTypeGroupColor(dayType: DayType): string {
    let color = 'transparent';
    if (this.dayTypeGroups && dayType && dayType.dayTypeGroupId) {
      let dayTypeGroup = this.dayTypeGroups.find(value => value.id === dayType.dayTypeGroupId);
      if (dayTypeGroup && dayTypeGroup.color && dayTypeGroup.color.length > 0) {
        color = dayTypeGroup.color
      }
    }
    return color;
  }
}
