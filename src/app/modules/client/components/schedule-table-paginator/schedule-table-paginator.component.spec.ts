import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTablePaginatorComponent } from './schedule-table-paginator.component';

describe('ScheduleTablePaginatorComponent', () => {
  let component: ScheduleTablePaginatorComponent;
  let fixture: ComponentFixture<ScheduleTablePaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTablePaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTablePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
