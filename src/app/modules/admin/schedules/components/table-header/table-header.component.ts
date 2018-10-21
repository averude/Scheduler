import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginatorService } from '../../paginator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: '[app-table-header]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit, OnDestroy {

  daysInMonth: Date[];
  private sub: Subscription;

  constructor(private paginatorService: PaginatorService) { }

  ngOnInit() {
    this.sub = this.paginatorService.dates
      .subscribe(daysInMonth => this.daysInMonth = daysInMonth);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isWeekend(day: Date): boolean {
    return day.getDay() === 0 || day.getDay() === 6;
  }
}
