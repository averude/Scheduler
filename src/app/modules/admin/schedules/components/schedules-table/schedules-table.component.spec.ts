import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesTableComponent } from './schedules-table.component';

describe('SchedulesTableComponent', () => {
  let component: SchedulesTableComponent;
  let fixture: ComponentFixture<SchedulesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
