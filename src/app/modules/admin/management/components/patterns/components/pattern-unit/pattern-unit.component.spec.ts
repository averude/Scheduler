import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternUnitComponent } from './pattern-unit.component';

describe('PatternUnitComponent', () => {
  let component: PatternUnitComponent;
  let fixture: ComponentFixture<PatternUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
