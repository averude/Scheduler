import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Filterable } from "../../../lib/ngx-schedule-table/model/data/filterable";

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent implements OnInit, OnDestroy {

  @Input() filterableData: Filterable;

  private filterSubject: Subject<string> = new Subject();
  private filterSubscription: Subscription;

  private isDirty: boolean = false;

  constructor(private tableRenderer: TableRenderer) { }

  ngOnInit(): void {
    this.filterSubscription = this.filterSubject
      .asObservable()
      .pipe(debounceTime(1000))
      .subscribe(value => this.onFilter(value));
  }

  ngOnDestroy(): void {
    if (this.isDirty) {
      this.onFilter(null);
    }

    this.filterSubscription.unsubscribe();
  }

  onKeyUp(value: string) {
    this.isDirty = true;
    this.filterSubject.next(value);
  }

  private onFilter(value: string) {

    if (!value) {
      this.filterableData.clearFilter();
      this.isDirty = false;
    } else {
      this.filterableData.filter(value);
    }

    this.tableRenderer.renderAllRowGroups();
  }

}

