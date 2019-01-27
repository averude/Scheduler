import { Component, OnInit } from '@angular/core';
import { DayType } from '../../../../../../../model/daytype';
import { DayTypeService } from '../../../../../../../services/daytype.service';

@Component({
  selector: 'app-daytypes-table',
  templateUrl: './daytypes-table.component.html',
  styleUrls: ['./daytypes-table.component.css']
})
export class DayTypesTableComponent implements OnInit {

  dayTypes: DayType[];

  constructor(private dayTypeService: DayTypeService) { }

  ngOnInit() {
    this.dayTypeService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes);
  }

  addDayType(dayType: DayType) {
    this.dayTypeService.create(dayType)
      .subscribe(res => {
        dayType.id = res;
        this.dayTypes.push(dayType);
      });
  }

  updateDayType(dayType: DayType) {
    this.dayTypeService.update(dayType)
      .subscribe(res => console.log(res));
  }

  deleteDayType(dayType: DayType) {
    this.dayTypeService.delete(dayType.id)
      .subscribe(res => this.dayTypes = this.dayTypes
        .filter(type => type !== dayType));
  }
}
