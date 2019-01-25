import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternSequenceComponent } from './pattern-sequence.component';

describe('PatternSequenceComponent', () => {
  let component: PatternSequenceComponent;
  let fixture: ComponentFixture<PatternSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
