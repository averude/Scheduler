import { Component, Input, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationService } from "../service/pagination.service";
import { AfterDateColumnDef, BeforeDateColumnDef } from "../directives/column";

@Component({
  selector: '[app-table-header]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit, OnDestroy {

  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns: QueryList<AfterDateColumnDef>;

  @Input() headerDateCellDef: TemplateRef<any>;

  dates: any[] = [];
  private sub: Subscription;

  constructor(private paginatorService: PaginationService) { }

  ngOnInit() {
    this.sub = this.paginatorService.onValueChange
      .subscribe(dates => this.dates = dates);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
