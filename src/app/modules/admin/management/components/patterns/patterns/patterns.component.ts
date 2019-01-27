import { Component, OnInit } from '@angular/core';
import { DayTypeService } from "../../../../../../services/daytype.service";
import { DayType } from "../../../../../../model/daytype";

@Component({
  selector: 'app-root',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.css']
})
export class PatternsComponent implements OnInit {

  departmentId = 1;
  dayTypes: DayType[];

  constructor(private dayTypeService: DayTypeService) { }

  ngOnInit() {
    this.dayTypeService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes);
  }

}
