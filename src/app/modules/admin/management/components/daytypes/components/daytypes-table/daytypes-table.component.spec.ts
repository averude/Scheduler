import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaytypesTableComponent } from './daytypes-table.component';

describe('DaytypesTableComponent', () => {
  let component: DaytypesTableComponent;
  let fixture: ComponentFixture<DaytypesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaytypesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaytypesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
