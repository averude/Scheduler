import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTableCellComponent } from './schedule-table-cell.component';

describe('ScheduleTableCellComponent', () => {
  let component: ScheduleTableCellComponent;
  let fixture: ComponentFixture<ScheduleTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
