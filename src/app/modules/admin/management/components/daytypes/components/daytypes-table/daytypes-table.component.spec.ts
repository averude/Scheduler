import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTypesTableComponent } from './daytypes-table.component';

describe('DayTypesTableComponent', () => {
  let component: DayTypesTableComponent;
  let fixture: ComponentFixture<DayTypesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayTypesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTypesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
