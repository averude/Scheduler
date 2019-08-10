import { Component, Input, OnInit } from '@angular/core';
import { Shift } from "../../../../../model/shift";
import { Employee } from "../../../../../model/employee";
import { Observable } from "rxjs";
import { ShiftPattern } from "../../../../../model/shift-pattern";
import { PaginatorService } from "../../../../../shared/paginators/paginator.service";
import { DayType } from "../../../../../model/day-type";

@Component({
  selector: '[app-table-shift-group]',
  templateUrl: './table-shift-group.component.html',
  styleUrls: ['./table-shift-group.component.css']
})
export class TableShiftGroupComponent implements OnInit {
  numberOfColumns: number;

  @Input() mouseMove$: Observable<number>;
  @Input() mouseUp$:   Observable<MouseEvent>;

  @Input() patterns:     ShiftPattern[];
  @Input() shift:        Shift;
  @Input() employees:    Employee[];
  @Input() dayTypes:     DayType[];

  @Input() workingTimeNorm: number;

  shown: boolean = true;

  constructor(private paginatorService: PaginatorService) { }

  ngOnInit() {
    this.paginatorService.dates
      .subscribe(daysInMonth => this.numberOfColumns = daysInMonth.length + 4);
  }

}
