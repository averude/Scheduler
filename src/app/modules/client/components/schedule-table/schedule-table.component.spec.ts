import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTableComponent } from './schedule-table.component';

describe('ScheduleTableComponent', () => {
  let component: ScheduleTableComponent;
  let fixture: ComponentFixture<ScheduleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
