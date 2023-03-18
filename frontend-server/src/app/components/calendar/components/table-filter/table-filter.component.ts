import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TableRenderer } from "../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { Filterable } from "../../../../lib/ngx-schedule-table/model/data/filterable";

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFilterComponent implements OnInit, OnChanges, OnDestroy {

  @Input() filterableData: Filterable;
  @Input() applyFilterOnDataChange: boolean = false;

  private filterSubject: Subject<string> = new Subject();
  private filterSubscription: Subscription;

  private isDirty: boolean = false;
  private lastFilterValue: string = '';

  constructor(private tableRenderer: TableRenderer) { }

  ngOnInit(): void {
    this.filterSubscription = this.filterSubject
      .asObservable()
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(value => value != this.lastFilterValue)
      )
      .subscribe(value => this.onFilter(value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['filterableData'];
    if (this.applyFilterOnDataChange && change && this.lastFilterValue) {
      change.currentValue.filter(this.lastFilterValue);
    }
  }

  ngOnDestroy(): void {
    if (this.isDirty) {
      this.onFilter(null);
    }

    this.filterSubscription.unsubscribe();
  }

  onKeyUp(value: string) {
    this.filterSubject.next(value);
  }

  private onFilter(filterValue: string) {

    if (!filterValue) {
      this.isDirty = false;
      this.lastFilterValue = '';
      this.filterableData.clearFilter();
    } else {
      this.isDirty = true;
      this.lastFilterValue = filterValue;
      this.filterableData.filter(filterValue);
    }

    this.tableRenderer.renderAllRowGroups();
  }

}

