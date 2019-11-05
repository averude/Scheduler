import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CalendarDay } from "../../../../../../../model/ui/calendar-day";
import { WorkDay } from "../../../../../../../model/workday";
import { DayType } from "../../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { ShowHoursService } from "../show-hours-control/show-hours.service";
import { setLabel, toggleClass } from "./table-cell.utils";

@Component({
  selector: '[app-table-cell]',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellComponent implements OnInit, OnChanges {

  private currValue: WorkDay;
  private prevValue: WorkDay;

  @Input() set workDay(workDay: WorkDay) {
    this.prevValue = this.currValue;
    this.currValue = workDay;
  }

  get workDay() {
    return this.currValue;
  }

  @Input() day: CalendarDay;
  @Input() dayTypes: DayType[];
  @Input() dayTypeGroups: DayTypeGroup[];
  @Input() labelColor = "transparent";

  @Input() enabled: boolean = true;

  showHours: boolean;
  label: string | number = '-';

  selected: boolean;
  className = "selected";

  constructor(public elementRef: ElementRef,
              private cd: ChangeDetectorRef,
              private showHoursService: ShowHoursService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.showHoursService.isShown.subscribe(isShown => {
      this.showHours = isShown;
      if (this.workDay) {
        this.refreshLabel();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workDay']) {
      setLabel(this);
    }
  }

  revertChanges() {
    this.currValue = this.prevValue;
    this.refreshLabel();
  }

  refreshLabel() {
    setLabel(this);
    this.cd.markForCheck();
  }

  @HostListener('mousedown')
  mouseDown() {
    if (this.enabled) {
      this.select();
    }
  }

  select() {
    if (this.enabled && !this.selected) {
      this.selected = true;
      toggleClass(this.elementRef, this.className);
    }
  }

  deselect() {
    if (this.enabled && this.selected) {
      this.selected = false;
      toggleClass(this.elementRef, this.className);
    }
  }
}
