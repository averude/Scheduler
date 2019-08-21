import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarDay } from "../../../../../model/ui/calendar-day";
import { PaginatorService } from "../../../../../shared/paginators/paginator.service";

@Component({
  selector: '[app-table-header]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit, OnDestroy {

  daysInMonth: CalendarDay[] = [];
  private sub: Subscription;

  constructor(private paginatorService: PaginatorService) { }

  ngOnInit() {
    this.sub = this.paginatorService.dates
      .subscribe(daysInMonth => this.daysInMonth = daysInMonth);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
